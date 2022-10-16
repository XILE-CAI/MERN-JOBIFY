import express from 'express'
const router = express.Router()

import {deleteJob, createJob, getAllJobs, updateJob, showStats} from "../controllers/jobsController.js"

// if it is post will be create ,if it is get will be getall jobs
router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router