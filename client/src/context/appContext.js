import React,{ useReducer, useContext} from 'react'
import reducer from './reducer'
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT ,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from "./actions"

import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState={
   isLoading: false,
   showAlert: false,
   alertText: '',
   alertType: '', 
   user: user ? JSON.parse(user) : null,
   token:token,
   userLocation:userLocation || '',
   jobLocation:userLocation || '',
   showSidebar:false,
}

//first step create context object
const AppContext = React.createContext()

//children
const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, initialState)

    //axios global setup
    const authFetch = axios.create({
        baseURL:'/api/v1/',
    })
    //axios request
    authFetch.interceptors.request.use(
        (config) => {
        //use ####debug this error spend 45 minus! this instead of using common
          config.headers['Authorization'] = `Bearer ${state.token}`
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
    )
    //axios response
    authFetch.interceptors.response.use(
        (response)=>{
            return response
        },
    (error)=>{
        console.log(error)
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })
    
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () =>{
        setTimeout(()=>{
            dispatch({type: CLEAR_ALERT})
        },5000)
    }

    //local storage
    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
        localStorage.setItem('location',location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    //register function
    const registerUser = async(currentUser) => {
        dispatch({type:REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('api/v1/auth/register',currentUser)
            console.log(response)
            const{ user, token, location} = response.data
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:{user,token,location}
            })

            //local storage
            addUserToLocalStorage({user,token,location})
        } catch (error) {
            console.log(error.response)
            dispatch({type:REGISTER_USER_ERROR,
            payload:{msg:error.response.data.msg}})
        }
        clearAlert()
    }

    //login function
    const loginUser = async (currentUser) =>{
        dispatch({type:LOGIN_USER_BEGIN })
        try {
            const {data}= await axios.post('api/v1/auth/login',currentUser)
            //console.log(response)
            const{ user, token, location} = data
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{user,token,location}
            })

            //local storage
            addUserToLocalStorage({user,token,location})
        } catch (error) {
            //console.log(error.response)
            dispatch(
                {
                    type:LOGIN_USER_ERROR,
                    payload:{msg:error.response.data.msg}
                })
        }
        clearAlert()
    }

    //toggle sidebar function
    const toggleSidebar = () => {
        dispatch({type:TOGGLE_SIDEBAR})
    }

    //logout function
    const logoutUser = () =>{
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage()
    }
    
    //Update User function
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
          const { data } = await authFetch.patch('/auth/updateUser', currentUser)
    
          const { user, location, token } = data
    
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user, location, token },
          })
          addUserToLocalStorage({ user, location, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                type: UPDATE_USER_ERROR,
                payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }

    return <AppContext.Provider 
        value={
            {
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                toggleSidebar,
                logoutUser,
                updateUser,
            }
        }>
        {children}
    </AppContext.Provider>
}



//use context
const useAppContext = () =>{
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext}