import express from 'express'
const app = express()

import dotenv from 'dotenv'
import connectDB from './db/connect.js'

dotenv.config()

import morgan from 'morgan'
//avoid to use try catch
import 'express-async-errors'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from "./middleware/error-handler.js"
import authenticateUser from './middleware/auth.js'

//routers
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

//make jason data available
app.use(express.json())

app.get('/api/v1',(req,res)=>{
    res.json({msg:"Welcome API!"})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//frontend port is localhost 3000
const port = process.env.PORT || 5000

//connectDB return a promise so need to use async and await
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

// start function
start()