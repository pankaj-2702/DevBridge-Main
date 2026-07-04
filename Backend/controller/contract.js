// controllers/contractController.js

const Contract = require('../model/contract')
const Project  = require('../model/project')
const { NotFoundError, Unauth, BadRequestError } = require('../errors/index')

const completeContract = async (req, res) => {
    const { id } = req.params
    const clientId = req.user.userId

   
    const contract = await Contract.findById(id)
    if (!contract) {
        throw new NotFoundError('Contract not found')
    }



   
    if (contract.clientId.toString() !== clientId) {
        throw new Unauth('You do not own this contract')
    }

  
    if (contract.status !== 'ACTIVE') {
        throw new BadRequestError(`Contract is already ${contract.status}`)
    }

    
    const [updatedContract] = await Promise.all([
        Contract.findByIdAndUpdate(
            id,
            { status: 'COMPLETED' },
            { new: true }
        ),
        Project.findByIdAndUpdate(
            contract.projectId,
            { status: 'COMPLETED' }
        )
    ])

    res.status(200).json({
        msg: 'Contract completed successfully',
        contract: {
            _id          : updatedContract._id,
            projectId    : updatedContract.projectId,
            developerId  : updatedContract.developerId,
            agreedAmount : updatedContract.agreedAmount,
            status       : updatedContract.status
        }
    })
}

const getContract = async (req, res) => {
    const { id }  = req.params
    const userId  = req.user.userId

    const contract = await Contract.findById({_id : id})
        .populate('projectId',   'title description status budget skillsRequired createdAt')
        .populate('clientId',    'name email bio profilePhoto rating')
        .populate('developerId', 'name email bio profilePhoto skills rating')
        .populate('proposalId',  'coverLetter bidAmount')

    if (!contract) {
        throw new NotFoundError('Contract not found')
    }
     

    if (!contract.clientId || !contract.developerId) {
        throw new NotFoundError('Contract references deleted users')
    }

    
   const isClient    = contract.clientId._id == userId
   const isDeveloper = contract.developerId._id== userId

    if (!isClient && !isDeveloper) {
        throw new Unauth('You are not a party to this contract')
    }

    res.status(200).json({ contract })
}

const getAllContracts = async (req ,res)=>{
    const userId = req.user.userId
    //const field = req.user.role

    const field = req.user.role === 'client' ? 'clientId' : 'developerId'
     const query = {[field] : userId }

     console.log(query)
    const contracts = await Contract.find(query)
    .populate('projectId', 'title status budget')
    .populate('clientId', 'name profilePhoto')
    .populate('developerId', 'name profilePhoto')
    .sort({ createdAt: -1 });

  if(!contracts){
        throw new NotFoundError('No contract is found')
    }


res.status(200).json({ contracts });

    
    
}

module.exports = { completeContract ,getContract , getAllContracts}