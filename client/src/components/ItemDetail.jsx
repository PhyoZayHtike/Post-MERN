import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatDistance } from "date-fns";
import { Link } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

const ItemDetail = ({post,username,time}) => {
  return (
    <div>
      <div className="bg-indigo-100  rounded-t-lg border border-gray-400 shadow-lg">
      <div className="flex justify-between items-center border-b-2 border-gray-400 px-4 py-2 font-light text-lg">
      <div className='flex items-center'>
      <Link to={'/'} className='text-gray-600 hover:text-gray-800'>
        <ArrowBack sx={{ fontSize: 45 }} />
      </Link>
        <div className="uppercase ms-2">{time}</div>
      </div>
        <div className="bg-gray-600 inline-block ms-4 mt-2 rounded-lg text-white p-1 px-2 text-sm hover:bg-gray-700 italic">{username}</div>
      </div>
      <div className="px-5 py-2">
        <h1 className="mb-2 text-3xl font-mono font-bold">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
      </div>
    </div>
  )
}

export default ItemDetail