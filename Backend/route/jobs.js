const {createProject , getAllProjects, getProject , updateProject , deleteProject, getMyProjects} = require('../controller/project')
const {createProposal , getProposal} = require('../controller/proposal')

const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()


Route.route('/').get(
    authentication,
    authorise('client','developer'),
    getAllProjects).post(
     authentication,
    authorise('client'),
    createProject
    )
Route.route('/me').get(authentication,authorise('client'),getMyProjects) 
Route.route('/:id').get(authentication,getProject)
                   .patch(authentication,authorise('client'),updateProject)
                   .delete(authentication,authorise('client'),deleteProject)

Route.route('/:id/proposals').get(authentication,authorise('client'),getProposal)                   


module.exports = Route