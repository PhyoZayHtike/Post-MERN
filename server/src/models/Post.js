import mongoose from "mongoose";

const Postschema = new mongoose.Schema(
    {
    title: {type: String,require:true},
    description: {type:String,require:true},
    userID : {type:String,require:true}
    },
    {
        timestamps: true
    }
)

export const PostModel = mongoose.model("posts",Postschema)