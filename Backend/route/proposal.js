const {createProposal , getProposal, updateProposals , withdrawProposal, myProposals, getProposalById} = require('../controller/proposal')
const { acceptProposal} = require('../controller/proposalaccept')
const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()


Route.route('/me').get(authentication, authorise('developer'),myProposals)
Route.route('/:id').post(authentication,authorise('developer'),createProposal)
                    .patch(authentication,authorise('developer'),updateProposals)
                    .delete(authentication,authorise('developer'),withdrawProposal)
                    .get(authentication,authorise('developer'),getProposalById)

//Route.route('/:id/proposals').get(authentication, authorise('client'),getProposal)
Route.route( '/:id/accept').post(authentication,authorise('client'),acceptProposal)
 
module.exports = Route