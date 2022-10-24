import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute =({children}) => {

    const { user } = useAppContext()
    // if no user return landing page
    if(!user){
        return <Navigate to="/landing" />
    }
    // children in there is ShareLayout
  return children
}

export default ProtectedRoute