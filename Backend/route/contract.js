const { completeContract , getContract, getAllContracts} = require('../controller/contract')
const {getMessages} = require('../controller/Messages')

const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()


Route.route('/').get(authentication,authorise('client','developer'),getAllContracts)

Route.route( '/:id/complete').post(authentication,authorise('client'),completeContract)

Route.route('/:id').get(authentication,authorise('client','developer'),getContract)
Route.route('/:id/messages')
    .get(authentication, getMessages);
module.exports = Route