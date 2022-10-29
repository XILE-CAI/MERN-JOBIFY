import React from 'react'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext()

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    // if(!position || !company || !jobLocation){
    //   displayAlert()
    //   return
    // } 
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
          {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow 
            type='text' 
            name='position' 
            value={position}
            handleChange = {handleJobInput}
          />
          {/* company */}
          <FormRow 
            type='text' 
            name='company' 
            value={company}
            handleChange = {handleJobInput}
          />
          {/* Location */}
          <FormRow 
            type='text' 
            labelText = 'job location'
            name='jobLocation' 
            value={jobLocation}
            handleChange = {handleJobInput}
          />
          {/* Job Type */}
          <FormRowSelect 
            name="jobType" 
            labelText="type"
            value={jobType} 
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* <div className='form-row'>
            <label htmlFor='jobType' className='form-label'>
              job type
            </label>
            <select
              name='jobType'
              value={jobType}
              onChange={handleJobInput}
              className='form-select'
            >
              {jobTypeOptions.map((itemValue, index) => {
                return(
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                )
              })}
            </select>
          </div> */}
          {/* Job Status */}
          <FormRowSelect 
            name="status" 
            value={status} 
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className='btn-container'>
            <button 
              type='submit' 
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <button 
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob