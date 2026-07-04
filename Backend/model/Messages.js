const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
        required: [true, 'Contract ID is required'],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender ID is required'],
    },
    message: {
        type: String,
        required: [true, 'Message cannot be empty'],
        maxlength: [2000, 'Message cannot exceed 2000 characters'],
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, 
{ 
    timestamps: { createdAt: true, updatedAt: false }  
});


MessageSchema.index({ contractId: 1, createdAt: 1 });


MessageSchema.index({ senderId: 1 });


MessageSchema.index({ contractId: 1, isRead: 1 });

module.exports = mongoose.model('Message', MessageSchema);