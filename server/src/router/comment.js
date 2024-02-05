import express from 'express'
import { CommentModel } from '../models/Comment.js'

const router = express.Router()

router.post('/',async(req,res)=>{
    try {
    const {postID,userID,comment} = req.body
    if(!postID || !userID || !comment ){
        return res.status(400).send({message: "Require"})
      }
      const newComment = {
        postID,
        userID,
        comment
      }
      const createComment = await CommentModel.create(newComment)
      res.json(createComment) 
    } catch (error) {
        res.send({message: error.message})
    }
})

router.get('/',async(req,res) => {
    try {
        const comments = await CommentModel.find({})
        return res.json(comments)
    } catch (error) {
        res.send({message: error.message})
    }
})

export {router as commentRouter}