import express from "express"
import { PostModel } from "../models/Post.js"
import { CommentModel } from "../models/Comment.js"

const router = express.Router()

router.post('/',async(req,res) => {
    try {
        const {title,description,userID} = req.body
        if(!title || !description || !userID ){
          return res.status(400).send({message: "Require"})
        }
        const newPost = {
            title,
            description,
            userID
        }
        const createPost = await PostModel.create(newPost)
        res.json(createPost) 
    } catch (error) {
        res.send({message: error.message})
    }
})

router.get('/',async(req,res) => {
    try {
        const posts = await PostModel.find({})
        return res.json(posts)
    } catch (error) {
        res.send({message: error.message})
    }
})

router.get('/:id',async(req,res) => {
    try {
        const {id} = req.params
        const posts = await PostModel.findById(id)
        return res.json(posts)
    } catch (error) {
        res.send({message: error.message})
    }
})

router.put('/:id',async(req,res) => {
    try {
        const {title,description,userID} = req.body
        if(!title || !description || !userID ){
          return res.status(400).send({message: "Require"})
        }
        const {id} = req.params
        const post = await PostModel.findById(id)
        if (!post) {
            return res.status(404).send("Post not found");
        }
        if(post.userID.toString() !== userID.toString()){
            return res.status(403).send("Unauthorized");
        }
        const result = await PostModel.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).json({message: "Post Not Found!"})
        }
        return res.send({message: "Post Updated Successfully"})
    } catch (error) {
        res.send({message: error.message})
    }
})

router.delete('/:id',async(req,res) => {
    try {
        const {id} = req.params
        await CommentModel.deleteMany({postID: id})
        const result = await PostModel.findOneAndDelete({_id: id})
        if(!result){
            return res.status(404).json({message: "Post Not Found!"})
        }
        return res.send({message: "Post Deleted Successfully"})
    } catch (error) {
        res.send({message: error.message})
    }
})

export {router as postRouter}