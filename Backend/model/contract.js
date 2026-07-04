// models/Contract.js

const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        developerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        proposalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Proposal',
            required: true
        },
        agreedAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: {
                values: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
                message: '{VALUE} is not a valid status'
            },
            default: 'ACTIVE'
        },
        startDate: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Contract', ContractSchema)