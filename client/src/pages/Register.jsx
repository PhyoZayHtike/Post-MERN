import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { enqueueSnackbar} from 'notistack'

const Register = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate()
  const register = async(e) => {
     e.preventDefault()
     try {
      await axios.post("http://localhost:3001/auth/register",{
        username,password
      })
      enqueueSnackbar("Register Successfully Please Login Here!",{
        variant:'success'
      })
      navigate('/login')
     } catch (error) {
      enqueueSnackbar(error.response.data.message,{
        variant:'error'
      })
     }
  }
  return (
    <div className='w-[380px] md:w-3/4 lg:w-2/4 xl:w-1/3  mx-auto mt-36'>
      <div className='md:border border-gray-400 rounded-lg bg-indigo-100 p-5 md:p-10'>
      <h1 className='text-4xl font-semibold text-gray-600'>Register</h1>
      <form onSubmit={register}>
      <div className='my-4'>
        <label className='mr-4' htmlFor="username">Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} id='username' className='border-2 border-gray-500 px-4 py-2 w-full' placeholder='Enter your username'/>
      </div>
      <div className='my-4'>
        <label className='mr-4' htmlFor="password">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} id='password' className='border-2 border-gray-500 px-4 py-2 w-full' placeholder='Enter your password'/>
      </div>
      <div className='flex justify-end'>
      <button className='bg-black px-3 py-2 rounded text-white hover:bg-gray-800'>Register Here</button>
      </div>
      </form>
      </div>
    </div> 
  )
}

export default Register