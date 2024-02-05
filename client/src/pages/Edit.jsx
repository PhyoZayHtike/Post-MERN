import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar} from 'notistack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Edit = () => {
    const [title,setTitle] = useState('')
    const [description, setDescription] = useState("");
    const userID = window.localStorage.getItem("userID")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
     axios.get(`http://localhost:3001/post/${id}`)
     .then((response) => {
        setTitle(response.data.title)
        setDescription(response.data.description)
     })
     .catch((error) => {
        console.log(error);
     })
    },[])

    const edit = (e) => {
     e.preventDefault()
     try {
        const response = axios.put(`http://localhost:3001/post/${id}`,{
          title,
          description,
          userID
        })
        enqueueSnackbar("Post Edit Successfully",{
          variant:'success'
        })
        navigate('/')
      } catch (error) {
        enqueueSnackbar("Error",{
          variant:'error'
        })
        console.log(error);
      }
    }
  return (
    <div>
      <div className="w-[380px] md:w-3/4 lg:w-2/4 xl:w-1/2  mx-auto mt-10 bg-indigo-100 rounded-2xl">
      <Link to={'/'} className='text-gray-600 hover:text-gray-800 block ms-3 pt-5'>
        <ArrowBackIcon sx={{ fontSize: 45 }} />
      </Link>
      <div className="md:px-10 p-3">
        <h1 className="text-4xl font-semibold text-gray-600">Edit Post</h1>
        <form onSubmit={edit}>
          <div className="my-4">
            <label className="mr-4" htmlFor="username">
              Title
            </label>
            <input
              type="text"
              value={title}
              id="username"
              className="border-2 border-gray-300 bg-transparent px-4 py-2 w-full"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="mr-4 block" htmlFor="password">
              Description
            </label>
            <ReactQuill
              className="h-40 w-full inline-block"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-black px-3 py-2 rounded text-white hover:bg-gray-800">
              Update Here
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Edit