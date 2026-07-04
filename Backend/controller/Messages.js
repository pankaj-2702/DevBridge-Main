const mongoose = require('mongoose');
const Message = require('../model/Messages')
const Contract = require('../model/contract')
const {Unauth ,BadRequestError ,NotFoundError} = require('../errors/index')
const sendMessage = async (req, res) => {
    const { contractId } = req.params;
    const { message } = req.body;

    // Validate message
    if (!message || message.trim() === '') {
        throw new BadRequestError('Message cannot be empty');
    }
    if (message.length > 2000) {
        throw new BadRequestError('Message cannot exceed 2000 characters');
    }

    // Check contract exists
    const contract = await Contract.findById(contractId);
    if (!contract) {
        throw new NotFoundError('Contract not found');
    }

    // Check user is participant of this contract
    const isParticipant =
        contract.clientId.toString()     === req.user.userId ||
        contract.developerId.toString() === req.user.userId;

    if (!isParticipant) {
        throw new Unauth('You are not part of this contract');
    }

    // Create message
    const newMessage = await Message.create({
        contractId,
        senderId: req.user.userId,
        message:  message.trim(),
    });

    // Populate sender details before returning
    await newMessage.populate('senderId', 'name profilePhoto');

    res.status(201).json({ message: newMessage });
};

// GET /api/contracts/:id/messages?cursor=<lastMessageId>&limit=20

const getMessages = async (req, res) => {
    const { id: contractId } = req.params;
    const { cursor, limit = 20 } = req.query;

    // Validate contractId
    if (!mongoose.Types.ObjectId.isValid(contractId)) {
        throw new BadRequestError('Invalid contract ID');
    }

    // Check contract exists
    const contract = await Contract.findById(contractId);
    if (!contract) {
        throw new NotFoundError('Contract not found');
    }

    // Check user is participant
    const isParticipant =
        contract.clientId.toString()     === req.user.userId ||
        contract.developerId.toString() === req.user.userId;

    if (!isParticipant) {
        throw new UnauthorizedError('You are not part of this contract');
    }

    //  Build query — if cursor provided, fetch messages BEFORE it
    const query = { contractId };
    if (cursor) {
        if (!mongoose.Types.ObjectId.isValid(cursor)) {
            throw new BadRequestError('Invalid cursor');
        }
        query._id = { $lt: cursor };  // messages older than cursor
    }

    const messages = await Message.find(query)
        .populate('senderId', 'name profilePhoto')
        .sort({ _id: -1 })               // newest first
        .limit(Number(limit));

    // Next cursor = last message's _id
    const nextCursor = messages.length === Number(limit)
        ? messages[messages.length - 1]._id
        : null;   // null means no more messages

    res.status(200).json({
        messages: messages.reverse(),    // return oldest first for display
        nextCursor,                      // send to client for next request
        hasMore: nextCursor !== null,
    });
};

module.exports ={getMessages ,sendMessage}