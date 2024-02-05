import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    username: {type: String,require:true,unique:true,min:4},
    password: {type:String,require:true,min:6}
})

export const UserModel = mongoose.model("users",Userschema)