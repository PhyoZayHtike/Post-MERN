import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import axios from 'axios'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import YourItem from '../components/YourItem'

const YourPost = () => {
  const [datas,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const userID = window.localStorage.getItem("userID");

  const fetchData = () => {
    setLoading(true)
    axios.get("http://localhost:3001/post")
    .then((response) => {
      const filteruser = response.data.filter(user => user.userID === userID)
       setData(filteruser)
       setLoading(false)
    })
    .catch((error) => {
       console.log(error);
       setError("NetWork Error")
       setLoading(false)
    })
  }
  useEffect(() => {
    fetchData()
   },[])
  return (
    <div>
    {error && <Error error={error}/>}
    {loading && <Spinner />}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-14 w-[355px] md:w-10/12 mx-auto mt-10 mb-10'>
    {!error && !loading && datas.map(post=> (<YourItem post={post} key={post._id} />))}
    </div>
  </div>
  )
}

export default YourPost