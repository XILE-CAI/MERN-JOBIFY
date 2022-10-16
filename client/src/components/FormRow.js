import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText}) => {
  return (
    <div className="form-row">
        {/* htmlfor = name in label and name = name in input make binding */}
        <label htmlFor={name} className="form-label">
            {labelText || name}
        </label>
        <input 
            type={type}
            value={value} 
            name={name}
            onChange={handleChange} 
            className="form-input" />
    </div >
  )
}

export default FormRow
