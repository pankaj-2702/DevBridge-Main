
const authorise = (...allowedRoles) =>{
    return(req,res,next)=>{
        const userRole = req.user.role
         console.log(userRole)
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({
        msg: `Role '${userRole}' cannot access this route`
      })
        }
        next();
    }
}

module.exports = authorise