const Proposal = require('../model/proposal')
const { findOneAndUpdate } = require('../model/user')
const {NotFoundError} = require('../errors/index')
const Project = require("../model/project");



const createProposal = async (req, res)=>{

   // console.log("createProposal called");
    const {id} = req.params
    req.body.developerId = req.user.userId
    req.body.projectId = id
    const proposal = await Proposal.create(req.body)

      await Project.findByIdAndUpdate(
        id,
        {
            $inc: { proposalCount: 1 }
        }
    );

    res.status(201).json({message : 'Created', proposal})
}

const getProposal = async (req,res)=>{
   const { id } = req.params

   const proposals = await Proposal.find({ projectId : id })
      .populate(
         "developerId",
         "name profilePhoto"
      );

   res.status(200).json({ proposals })
}

const getProposalById = async (req,res)=>{
   const{id} = req.params
   console.log(id)

   const proposal = await Proposal.findOne({_id: id })

   

   res.status(200).json({proposal})

}

const updateProposals = async (req, res)=>{
    const {id} = req.params
    const {coverLetter ,bidAmount }  = req.body
    req.body.developerId =req.user.userI ;
    
    

    const proposals = await Proposal.findOneAndUpdate({_id : id, developerId: req.user.userId , status : 'PENDING'},
                                                      req.body,
                                                     {returnDocument : 'after' , runValidators: true})

               if(!proposals){
                    throw new NotFoundError('No Proposal is found');
               }                                                 
             
                 res.status(200).json({proposals})                                         
}


const withdrawProposal = async (req, res)=>{

   const {id} = req.params

   const proposal = await Proposal.findOneAndDelete({_id : id , developerId : req.user.userId})
     if(!proposal){
                    throw new NotFoundError('No Proposal is found');
               } 
   const project = await Project.findOneAndUpdate(
      {_id : proposal.projectId}, 
      { $inc: { proposalCount: -1 } }
   )                                                            
             
                 res.status(200).send('Successful DELETE the Porposal') 

}

const myProposals = async (req, res)=>{
   
   const proposals = await Proposal.find({
    developerId: req.user.userId
})
.populate(
    "projectId",
    "title budget status clientId createdAt"
)
.sort({ createdAt: -1 });
     if(!proposals){
                    throw new NotFoundError('No Proposal is found');
               }                                                 
             
                 res.status(200).json({proposals}) 

}

module.exports = {
    createProposal,
    getProposal,
    updateProposals,
    withdrawProposal,
    myProposals,
    getProposalById
}