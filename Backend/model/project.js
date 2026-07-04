// models/Project.js

const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            minlength: [10, 'Title must be at least 10 characters'],
            maxlength: [150, 'Title cannot exceed 150 characters'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            minlength: [50, 'Description must be at least 50 characters'],
            maxlength: [5000, 'Description cannot exceed 5000 characters'],
            trim: true
        },
        budget: {
            type: Number,
            required: [true, 'Please provide a budget'],
            min: [1, 'Budget must be greater than 0']
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a client']
        },
        skillsRequired: {
            type: [String],
            default: []
        },
        status: {
            type: String,
            enum: {
                values: ['OPEN', 'IN_PROGRESS', 'COMPLETED'],
                message: '{VALUE} is not a valid status'
            },
            default: 'OPEN'
        },
        proposalCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true  
    }
)


ProjectSchema.index({ clientId: 1 })             /
ProjectSchema.index({ status: 1 })              
ProjectSchema.index({ skillsRequired: 1 })        
ProjectSchema.index({ createdAt: -1 })            

module.exports = mongoose.model('Project', ProjectSchema)