import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.post('/register', async(req,res) => {
    const {username,password} = req.body
    if (username.length < 4) {
        return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const user = await UserModel.findOne({username})
    if(user){
        return res.status(409).json({message: "User already exists!"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({username,password: hashPassword})
    await newUser.save()
    res.json({message: "User Registered Successfullay"})
})

router.post('/login',async(req,res) => {
    const {username,password} = req.body
    const user = await UserModel.findOne({username})
    if(!user){
       return res.status(404).json({message: "User Doesn't Exit!"})
    }
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        return res.status(401).json({message: "Username or Password Incorrect!"})
    }
    const token = jwt.sign({id:user._id},"secret")
    res.json({token,userID: user._id})
})

router.get('/',async(req,res) => {
    try {
        const users = await UserModel.find({},'_id username')
        return res.json(users)
    } catch (error) {
        res.send({message: error.message})
    }
})

router.get('/:id',async(req,res) => {
    try {
        const {id} = req.params
        const users = await UserModel.findById(id).select('_id username')
        return res.json(users)
    } catch (error) {
        res.send({message: error.message})
    }
})

export {router as userRouter}