const Review  = require('../model/Review');
const Contract = require('../model/contract');
const User    = require('../model/user');
const mongoose = require('mongoose');
const {Unauth , NotFoundError ,BadRequestError} = require('../errors/index')

// POST /api/reviews
const createReview = async (req, res) => {
    const { contractId } = req.params;   
    const { rating, comment } = req.body; 

    // Validate contractId
    if (!mongoose.Types.ObjectId.isValid(contractId)) {
        throw new BadRequestError('Invalid contract ID');
    }

    // Get contract — has everything we need
    const contract = await Contract.findById(contractId);
    if (!contract) {
        throw new NotFoundError('Contract not found');
    }

    // Check contract is completed
    if (contract.status !== 'COMPLETED') {
        throw new BadRequestError('Can only review after contract is completed');
    }

    // Check reviewer is participant
    const isParticipant =
        contract.clientId.toString()     === req.user.userId ||
        contract.developerId.toString() === req.user.userId;

    if (!isParticipant) {
        throw new Unauth('You are not part of this contract');
    }

    
    const projectId  = contract.projectId;
    const reviewerId = req.user.userId;
    const revieweeId = contract.clientId.toString() === req.user.userId
        ? contract.developerId  
        : contract.clientId;     
        
        
  const existingReview = await Review.findOne({
    contractId,
    reviewerId
});

if (existingReview) {
    throw new BadRequestError("You have already reviewed this contract");
}

    // Create review
    const review = await Review.create({
        projectId,   
        contractId,   
        reviewerId,  
        revieweeId,   
        rating,       
        comment,      
    });

    // Update reviewee rating
    const stats = await Review.aggregate([
        { $match: { revieweeId: new mongoose.Types.ObjectId(revieweeId) } },
        {
            $group: {
                _id:           '$revieweeId',
                averageRating: { $avg: '$rating' },
                totalReviews:  { $sum: 1 },
            }
        }
    ]);

    if (stats.length > 0) {
        await User.findByIdAndUpdate(revieweeId, {
            $set: {
                rating:       Math.round(stats[0].averageRating * 10) / 10,
                totalReviews: stats[0].totalReviews,
            }
        });
    }

    res.status(201).json({ review });
};


// GET /api/reviews/user/:userId
const getUserReviews = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestError('Invalid user ID');
    }

    const reviews = await Review.find({ revieweeId: userId })
        .populate('reviewerId', 'name profilePhoto')  // who wrote it
        .populate('projectId', 'title')               // which project
        .sort({ createdAt: -1 });                     // newest first

    res.status(200).json({ 
        count: reviews.length,
        reviews 
    });
};



module.exports = { createReview, getUserReviews };