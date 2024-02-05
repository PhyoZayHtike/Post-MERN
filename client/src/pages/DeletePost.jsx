import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {SnackbarProvider, enqueueSnackbar} from 'notistack'

const DeletePost = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/post/${id}`)
        .then(() => {
          enqueueSnackbar("Post Deleted Successfully",{
            variant:'success'
          })
          navigate('/')
        })
        .catch((error) => {
            console.log(error);
            enqueueSnackbar("Error",{
                variant:'error'
              })
        })
    }
  return (
    <div className='p-4'>
        <div className="flex justify-center items-center h-[600px] rounded-xl mx-auto">
         <div>
         <h3 className='text-2xl'> Are you sure You want to delete this Post?</h3>
          <button className='p-3 bg-black hover:bg-gray-700 text-white mt-5 rounded-md w-full' onClick={handleDelete}>Yes, Delete it</button>
         </div>
        </div>
    </div>
  )
}

export default DeletePost