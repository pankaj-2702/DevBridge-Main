const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError={
    message : err.message || 'Something went wrong',
    statusCode : err.code || 500
  }
  // if (err instanceof CustomAPIError) {
  //    console.log(err.message)
  //   return res.status(err.code).json({ msg: err.message })
   
  // }
  if(err.name==="CastError"){
    customError.message = `No job is found with ID ${err.value._id}`,
    customError.statusCode = 404
  }
  
  if(err.code && err.code == 11000){
    customError.message = `User with email  ${Object.values(err.keyValue)} already exist , Try a different one`,
    customError.statusCode = 404
  }

  console.error(err) 

 // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err : err })
  return res.status(customError.statusCode).json({ message: customError.message })
}

module.exports = errorHandlerMiddleware