
// models/Proposal.js

const mongoose = require('mongoose')

const ProposalSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: [true, 'Please provide a project']
        },
        developerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a developer']
        },
        coverLetter: {
            type: String,
            required: [true, 'Please provide a cover letter'],
            minlength: [50, 'Cover letter must be at least 50 characters'],
            maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
            trim: true
        },
        bidAmount: {
            type: Number,
            required: [true, 'Please provide a bid amount'],
            min: [1, 'Bid amount must be greater than 0']
        },
        status: {
            type: String,
            enum: {
                values: ['PENDING', 'ACCEPTED', 'REJECTED'],
                message: '{VALUE} is not a valid status'
            },
            default: 'PENDING'
        }
    },
    {
        timestamps: true
    }
)


ProposalSchema.index({ projectId: 1 })              
ProposalSchema.index({ developerId: 1 })           
ProposalSchema.index({ projectId: 1, developerId: 1 }, { unique: true })  

module.exports = mongoose.model('Proposal', ProposalSchema)