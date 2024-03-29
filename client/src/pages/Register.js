import { useState,useEffect } from "react"
import { Logo, FormRow, Alert} from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"
import { useNavigate} from 'react-router-dom'

//default state
const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:true,
}

const Register = () => {
    const [values, setValues] = useState(initialState)

    //Global state context 
    const { 
        user, 
        isLoading, 
        showAlert,
        //functions
        displayAlert,
        registerUser,
        loginUser,
    } = useAppContext()

    const navigate = useNavigate()

    const handleChange = (e) => {
        //keep all previous values but change target value
        setValues({...values,[e.target.name]:e.target.value})
    }
   
    //make sure input all value or will show alert
    const onSubmit = e => {
       e.preventDefault(); 
       const {name, email, password, isMember} = values
       // only if you are not a member then need a name
       if(!email || !password || (!isMember && !name)){
            displayAlert()
            return 
       }

       const currentUser = {name,email,password}
       if(isMember){
        loginUser(currentUser)
       }
       else{
        registerUser(currentUser)
       }
    }

    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate('/')
            },3000)
        }
    },[user,navigate])
    
    //toggle function
    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember })
    }

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register' }</h3>
                {showAlert && <Alert />}
                {/* name input */}
                {!values.isMember && <FormRow 
                    type="text" 
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />}
                {/* email input */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}    
                />
                {/* password input */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}    
                />

                <button type="submit" className="btn btn-block"
                disabled={isLoading}>Submit</button>

                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member'}
                    <button type="button" onClick={toggleMember} className="member-btn">
                        {values.isMember? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register