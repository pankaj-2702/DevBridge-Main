const { BadRequestError } = require('../errors');
const User =require('../model/user')

const getMe  = async (req , res) =>{
   // req.user is set by your JWT auth middleware
   console.log(req.user.userId)
    const user = await User.findById(req.user.userId).select('-password');
    
     if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
}

const updateMe = async (req, res)=>{

    const { name , bio, skills, portfolioLinks } = req.body
     if(name==''){
          throw new BadRequestError('Please provide Name')
      }
      
    const updates = {};
    if (name) updates.name = name.trim();
    if (bio) updates.bio = bio;
    if (skills) updates.skills = skills;
    if (portfolioLinks) updates.portfolioLinks = portfolioLinks;

     
    const user = await User.findOneAndUpdate({_id : req.user.userId },
                                                     updates,
                                                     {returnDocument : 'after' , runValidators: true}).select('-password');
     if(!user){
       throw new NotFoundError('No User is found');
  }                                                 

    res.status(200).json({user})
}

const cloudinary = require('../db/cloudinary');

const uploadPhoto = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        throw new BadRequestError('Please provide a photo');
    }

  
    const existingUser = await User.findById(req.user.userId);
    if (existingUser.profilePhotoId) {
        await cloudinary.uploader.destroy(existingUser.profilePhotoId);
    }

    const updates = {
        profilePhoto:   req.file.secure_url,
        profilePhotoId: req.file.public_id,
    };
    console.log(updates)
    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        updates,
        { returnDocument: 'after', runValidators: true }
    ).select('-password -email');

    if (!user) {
        throw new NotFoundError('No User found');
    }

    res.status(200).json({ user });
};

const getUserById = async ( req, res) =>{
    const {id} = req.params

    const user = await User.findById(id).select('-email -password');

    if(!user){
        throw new NotFoundError('No User is found');
    }
    res.status(200).json({user})
}

module.exports = { getMe , updateMe , uploadPhoto , getUserById};