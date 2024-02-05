import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import axios from "axios";
import { useCookies } from "react-cookie";

const Item = ({ post }) => {
  const userID = window.localStorage.getItem("userID");
  const [cookies,setCookies] = useCookies(["access_token"])
  const createdAt = new Date(post.createdAt);
  const now = new Date();
  const formattedDate = formatDistance(createdAt, now, { addSuffix: true });

  const [username,setUsername] = useState('')

  const fetchUser = () => {
    axios.get(`http://localhost:3001/auth/${post.userID}`)
    .then((response) => {
      setUsername(response.data.username)
    })
    .catch((error) => {
       console.log(error);
    })
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <div>
      <div className="bg-indigo-100 rounded-xl border-2 shadow-lg">
      <div className="flex justify-between items-center border-b-2 border-gray-300 px-4 py-2 font-light text-lg">
        <div className="uppercase">{formattedDate}</div>
        <div className="bg-gray-600 inline-block ms-4 mt-2 rounded-lg text-white p-1 px-2 text-sm hover:bg-gray-700 italic">{username}</div>
      </div>
      <div className="px-5 py-2">
        <h1 className="mb-2 text-3xl font-mono font-bold">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
      <div className="border-t-2 py-2 px-5 bg-indigo-200 rounded-b-xl flex justify-between">
      <div><Link className="text-lg" to={`/comment/${post._id}`}>Comment</Link></div>
      {userID === post.userID && cookies.access_token && (
          <div>
            <Link
            className="font-medium text-lg text-gray-600 hover:text-gray-800 transform transition hover:scale-125"
            to={`/edit/${post._id}`}
          >
            Edit
          </Link>
          <Link
            className="font-medium text-lg text-gray-600 hover:text-red-800 transform transition hover:scale-125 ms-3"
            to={`/delete/${post._id}`}
          >
            Delete
          </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Item;
