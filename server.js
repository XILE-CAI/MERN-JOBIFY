import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'



import morgan from 'morgan'
//avoid to use try catch
import 'express-async-errors'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


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

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/build')))

//make jason data available
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/api/v1',(req,res)=>{
    res.json({msg:"Welcome API!"})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//frontend port is localhost 3000
const port = process.env.PORT || 5000



//if connect is success then i can spin up server
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