require('dotenv').config()
const authentication = require('./middleware/authentication')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
//short term 
const {register ,login} = require('./controller/auth')
//connect to DATABASE
const connectBD = require('./db/connectDB')
//

//for FrontEnd and Backend Connection
const cors = require('cors');

app.use(cors({
    origin: process.env.CLIENT_URL,  // your frontend URL
    credentials: true,                // allow cookies/auth headers
}));
app.use(express.json())

// Auth Router 
const AuthRoute = require('./route/auth')

app.use('/api/auth',AuthRoute)

// Jobs Router 
const JobsRoute = require('./route/jobs')

app.use('/api/projects',JobsRoute)
// Proposal Router 
const ProposalRoute = require('./route/proposal')

app.use('/api/proposals',ProposalRoute)

// Contract Router 
const ContractRoute = require('./route/contract')

app.use('/api/contracts',ContractRoute)

 // Get Users 
const userRoutes = require('./route/users');
app.use('/api/users', userRoutes);

//Send Messages
const messageRoutes = require('./route/Messages');
app.use('/api/messages', messageRoutes);

// Review Route

const ReviewRoute = require('./route/Review')
app.use('/api/reviews',ReviewRoute)

app.use(errorHandlerMiddleware)

const PORT =process.env.PORT || 3000;
const start = async ()  =>{
    try{
        await connectBD(process.env.MONGO_URI)
        app.listen(PORT,console.log(`Port is listening at ${PORT}`))
    }catch(err){
        console.log(err)
    }
}
start()