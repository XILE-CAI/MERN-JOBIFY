import Job from "../models/Job.js"
import { StatusCodes} from'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js"
import CustomAPIError from "../errors/custom-api.js"
import mongoose from "mongoose"

//#### create job
const createJob = async (req, res) => {
    const{position,company}=req.body

    if(!position || !company){
        throw new BadRequestError('Please provide all values!')
    }

    req.body.createdBy = req.user.userId
    //create a job
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}


//#### get all jobs
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({jobs,totalJobs:jobs.length,numOfPages:1})
}


//#### update/edit function
const updateJob = async (req, res) => {
    const {id:jobId} = req.params
    const {company, position} = req.body

    if(!position || !company){
        throw new BadRequestError('Please provide all values!')
    }
    
    const job = await Job.findOne({_id:jobId}) 

    if(!job) {
        throw new NotFoundError(`No Job with Id: ${jobId}`)
    }

    //check permission
    // console.log(typeof req.user.userId)
    // console.log(typeof job.createdBy)

    checkPermissions(req.user, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({_id:jobId},req.body,{
        new:true,
        runValidators:true
    }) 

    res.status(StatusCodes.OK).json({updatedJob})
}


// #### delete/remove function
const deleteJob = async (req, res) => {
    const {id: jobId} = req.params

    const job = await Job.findOne({_id: jobId})

    if(!job){
        throw new CustomAPIError.NotFoundError(`No job with id: ${jobId}`)
    }
    
    //check permission!!!
    checkPermissions(req.user,job.createdBy)

    await job.remove()
    res.status(StatusCodes.OK).json({msg:'Job removed Successfully!'})
}


//####Show Stats function
const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {$match: {createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        //group by status: pending declined, interview
        {$group: {_id:'$status',count:{ $sum:1}}}
    ])

    //return stats as object{} instead of array[]
    stats = stats.reduce((acc, curr) => {
        const {_id:title, count} = curr
        acc[title] = count
        return acc
    },{})

    //default setup for stats
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = []
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}


export {deleteJob, createJob, getAllJobs, updateJob, showStats}