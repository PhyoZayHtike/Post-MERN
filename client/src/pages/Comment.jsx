import React, { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import ShowComment from "../components/ShowComment";
import { useParams } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";
import axios from "axios";
import { formatDistance } from "date-fns";
import { useCookies } from "react-cookie";
import Spinner from "../components/Spinner";

const Comment = () => {
  const {id} = useParams()
  const [cookies,setCookies] = useCookies(["access_token"])
  const [loading,setLoading] = useState(false)
  const [post,setPost] = useState('')
    const [username,setUsername] = useState('')
    const [time,setTime] = useState('')

    const postDetail = async() => {
      setLoading(true)
    axios.get(`http://localhost:3001/post/${id}`)
    .then((response) => {
      setPost(response.data)
      const createdAt = new Date(response.data.createdAt)
      const now = new Date();
      const formattedDate = formatDistance(createdAt, now, { addSuffix: true });
      setTime(formattedDate)
      fetchUser(response.data.userID)
      setLoading(false)
    })
    .catch((error) => {
        console.log(error);
    })
  }
  const fetchUser = (userID) => {
    axios.get(`http://localhost:3001/auth/${userID}`)
    .then((response) => {
      setUsername(response.data.username)
    })
    .catch((error) => {
       console.log(error);
    })
  }
  useEffect(() => {
     postDetail()
  },[])
  return (
    <div className="mt-10">
      {loading && <Spinner/>}
      <div className="antialiased mx-auto max-w-screen-sm p-2 mt-2">
        <div className="">
          <ItemDetail  post={post} username={username} time={time}/>
          {
            cookies.access_token && <CommentForm id={id}/>
          }
          <ShowComment id={id}/>
        </div>
      </div>
    </div>
  );
};

export default Comment;
