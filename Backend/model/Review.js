const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project ID is required'],
    },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
        required: [true, 'Contract ID is required'],
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Reviewer ID is required'],
    },
    revieweeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Reviewee ID is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        validate: {
            validator: Number.isInteger,
            message: 'Rating must be a whole number'  
        }
    },
    comment: {
        type: String,
        maxlength: [1000, 'Comment cannot exceed 1000 characters'],
        trim: true,
    },
},
{
    timestamps: { createdAt: true, updatedAt: false }
});


ReviewSchema.index({ revieweeId: 1 });

ReviewSchema.index({ contractId: 1, reviewerId: 1 }, { unique: true });


ReviewSchema.index({ rating: 1 });

module.exports = mongoose.model('Review', ReviewSchema);