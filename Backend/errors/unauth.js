const CustomAPIError =require('./custom-error')
const {StatusCodes} = require('http-status-codes')
class Unauth extends CustomAPIError{
    constructor(message){
        super(message)
        this.code=StatusCodes.UNAUTHORIZED
    }
}

module.exports=Unauth