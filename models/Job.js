import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true,'Please provide company'],
        maxLength:50
    },
    position:{
        type: String,
        required: [true,'Please provide position'],
        maxLength:100
    },
    status:{
        type: String,
        enum:['interview','pending','declined'],
        maxLength:100,
        default:'pending'
    },
    jobType:{
        type: String,
        enum:['full-time','part-time','casual','contract','remote','intern'],
        maxLength:100,
        default:'full-time'
    },
    jobLocation: {
        type:String,
        default:'my city',
        required: true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }, 
},
    {timestamps:true}
)

export default mongoose.model('Job',JobSchema)