import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CommentForm = ({id}) => {
    const [comment,setComment] = useState()
    const userID = window.localStorage.getItem("userID")
    const postID = id
    const navigate = useNavigate()
    const createComment = (e) => {
      e.preventDefault()
        try {
            const response = axios.post('http://localhost:3001/comment',{
              postID,
              userID,
              comment
            })
            navigate(`/`)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
         <form onSubmit={createComment} className="">
        <div className="py-2 px-4 mb-4 bg-white rounded-b-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea rows="4"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." onChange={e => setComment(e.target.value)} required>
            </textarea>
        </div>
        <div className="flex justify-end">
        <button className="bg-black px-3 py-2 rounded-md hover:bg-gray-800 text-white">Send</button>
        </div>
    </form>
    </div>
  )
}

export default CommentForm