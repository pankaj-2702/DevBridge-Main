const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type :String,
        required : [true, 'Please provide name'],
        maxlength :50,
        minlength :3
    },
     email : {
        type :String,
        trim :true,
        lowercase : true,
        required : [true, 'Please provide email'],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
       ],
     unique : true
    },
    password : {
        type : String,
        required : [true,'Please provide password']
    },
    role : {
        type :String,
         enum: {
         values: ['client','developer'],
         message: '{VALUE} is not supported',
        },
        required : [true , "Please provide role"],
    },
    bio : {
        type :String,
        maxlength : [500,"Bio cannot exceed 500 characters"]
    },
    skills : {
        type : [String],
        default :[]
    },
   portfolioLinks: {
    type: [
        {
            title: {
                type: String,
                trim: true,
                required : [true,"Please provide title"]
            },
            link: {
                type: String,
                trim: true,
                required : [true,"Please provide URL"],
                match: [
        /^https?:\/\/.+/,
        "Please provide a valid URL"
    ]
            }
        }
    ],
    default: []
},
    profilePhoto :{
         type : String,
        default :''
    },
    profilePhotoId:{
    type: String,
    default: ''
     },
    rating : {
        type : Number,
        default :0,
       min: [0, 'Rating cannot be less than 0'],
       max: [5, 'Rating cannot exceed 5'],
       set: v => parseFloat(v.toFixed(2))
    },
    totalReviews:{
        type : Number,
        default :0
    },
    isActive :{
        type :Boolean,
        default :true
    },
    
},
{
        timestamps: true
    }

)

UserSchema.pre('save', async function() {
     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password,salt);
     
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userID : this._id , name : this.name , role : this.role},process.env.JWT_SECRET,{ expiresIn :process.env.LIFETIME || '30d'})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword , this.password);
    return isMatch
}


module.exports = mongoose.model('User',UserSchema)