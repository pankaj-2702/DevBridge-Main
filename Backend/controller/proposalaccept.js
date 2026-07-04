// controllers/proposalController.js

const mongoose = require('mongoose')
const Proposal  = require('../model/proposal')
const Project   = require('../model/project')
const Contract  = require('../model/contract')
const { BadRequestError, NotFoundError, Unauth } = require('../errors/index')

const acceptProposal = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const clientId = req.user.userId

   const proposal = await Proposal.findOne({_id : id}) 
    if (!proposal) {
        throw new NotFoundError('Proposal not found')
    }
   const project  = await Project.findById(proposal.projectId)  

    
   
    if (!project) {
        throw new NotFoundError('Project not found')
    }

    
    if (project.clientId.toString() !== clientId) {
        throw new Unauth('You do not own this project')
    }

    
    if (project.status !== 'OPEN') {
        throw new BadRequestError(`Cannot accept proposals on a ${project.status} project`)
    }

    
    if (proposal.status !== 'PENDING') {
        throw new BadRequestError(`Cannot accept a ${proposal.status} proposal`)
    }


    if (proposal.projectId.toString() !== project._id.toString()) {
        throw new BadRequestError('Proposal does not belong to this project')
    }

    
    const session = await mongoose.startSession()

    try {
        session.startTransaction({
            readConcern:  { level: 'snapshot' },
            writeConcern: { w: 'majority' }
        })

    
        await Proposal.findByIdAndUpdate(
            id,
            { status: 'ACCEPTED' },
            { session }
        )

    
        await Proposal.updateMany(
            {
                projectId : project._id,
                _id       : { $ne: id },   
                status    : 'PENDING'
            },
            { status: 'REJECTED' },
            { session }
        )

        
        await Project.findByIdAndUpdate(
            project._id,
            { status: 'IN_PROGRESS' },
            { session }
        )

        
        const [contract] = await Contract.create(
            [
                {
                    projectId    : project._id,
                    clientId     : project.clientId,
                    developerId  : proposal.developerId,
                    proposalId   : proposal._id,
                    agreedAmount : proposal.bidAmount,
                    status       : 'ACTIVE',
                    startDate    : new Date()
                }
            ],
            { session }
        )

        
        await session.commitTransaction()

        
        res.status(201).json({
            contract: {
                _id          : contract._id,
                projectId    : contract.projectId,
                developerId  : contract.developerId,
                agreedAmount : contract.agreedAmount,
                status       : contract.status
            }
        })

    } catch (error) {
        
        await session.abortTransaction()
        throw error

    } finally {
        
        session.endSession()
    }
}

module.exports = { acceptProposal }