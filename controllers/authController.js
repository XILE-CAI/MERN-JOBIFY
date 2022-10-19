import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'


//### register function
const register = async (req, res) => {
    const {name, email, password} = req.body

    //check empty values in controller
    if(!name || !email || !password){
        throw new BadRequestError('please provide all values')
    }

    //make email unique
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already be registered')
    }

    const user = await User.create({name, email, password})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user:{
            email:user.email,
            lastName:user.lastName,
            location:user.location,
            name:user.name
    }, token, location:user.location})
}


//### login function
const login = async (req, res) => {
    const{ email, password } = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }

    //get the user using email
    const user = await User.findOne({ email }).select('+password')   
    if(!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    console.log(user)

    //### compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    // hidden password
    user.password = undefined
    
    res.status(StatusCodes.OK).json({user,token,location:user.location})
}



const updateUser = async (req, res) => {
    res.send('updateUser')
}



export {register,login,updateUser}