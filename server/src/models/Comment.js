import mongoose from "mongoose";

const Commentschema = new mongoose.Schema(
    {
    comment: {type:String,require:true},
    userID : {type:String,require:true},
    postID : {type:String,require:true}
    },
    {
        timestamps: true
    }
)

export const CommentModel = mongoose.model("comments",Commentschema)