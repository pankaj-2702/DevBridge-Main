const {BadRequestError , Unauth} = require('../errors/index')
const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
//const sendEmail = require('../utils/sendEmail')

const register = async (req , res) => {
  const {name , email, password , role} = req.body

  if(!name || !email || !password || !role){
    throw new BadRequestError('Please Provide name, email, password and role');
  }

  
   const user = await User.create(req.body)
   const token = user.createJWT()

  //  await sendEmail(
  //   email,
  //   "DevBridge Test Email",
  //   `<h2>Hello ${name}</h2><p>Your account was created successfully.</p>`
  // )

   res.status(StatusCodes.CREATED).json({user:{name : user.name,role:user.role},token : token})
}
const login = async (req , res) => {

     const {email,password } = req.body

     if(!email || !password){
      throw new BadRequestError('Please provide Email and Password')
     }
     const user = await User.findOne({email})
     
     if(!user){
      throw new Unauth('Invalid credentials')
     }

     const isPasswordCorrect = await user.comparePassword(password)
     if(!isPasswordCorrect){
      throw new Unauth('Invalid credentials')
     }
     const token = user.createJWT();
     res.status(StatusCodes.OK).json({user:
                                        {name:user.name,
                                         role : user.role,
                                         profilePhoto : user.profilePhoto,
                                         _id : user._id 
                                        } , 
                                        token : token,
                                        role : user.role
                                      })
 
}

module.exports ={
    register,
    login
}