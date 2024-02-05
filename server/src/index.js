import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./router/user.js"
import { postRouter } from "./router/post.js"
import { commentRouter } from "./router/comment.js"
import { config } from 'dotenv';

config();

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", userRouter )
app.use("/post", postRouter )
app.use("/comment", commentRouter )

mongoose.connect(process.env.MONGO_URL)

app.listen(3001,()=>{
    console.log("server run");
})