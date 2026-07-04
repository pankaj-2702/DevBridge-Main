const mongoose = require('mongoose')
const connectBD = async (url)=>{
  mongoose.connect(url)
}

module.exports= connectBD