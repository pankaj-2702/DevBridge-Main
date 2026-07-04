const Route = require('express').Router()
const {register , login} = require('../controller/auth')

Route.post('/signup',register)
Route.post('/login',login)

module.exports = Route