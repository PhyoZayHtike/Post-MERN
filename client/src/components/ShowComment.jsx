import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import Spinner from "./Spinner";

const ShowComment = ({ id }) => {
  const [comments, setComment] = useState([]);
  const [loading,setLoading] = useState(false)

  const fetchCommentAndUsername = async () => {
    try {
    setLoading(true)
      // Fetch comment
      const fetchComment = await axios.get("http://localhost:3001/comment");
      const comments = fetchComment.data;
      // Fetch username
      const fetchUser = await axios.get("http://localhost:3001/auth/");
      const usernames = {};
      fetchUser.data.forEach((user) => {
        usernames[user._id] = user.username;
      });
      // Map comments to include username
      const commentsWithUsername = comments.map((comment) => ({
        ...comment,
        username: usernames[comment.userID],
      }));
      // filter comment
      const filter = commentsWithUsername.filter((comment) => {
        return comment.postID === id;
      });
      // data format
      const commentTime = filter.map((comment) => {
        const createdAt = new Date(comment.createdAt);
        const now = new Date();
        const formattedTime = formatDistance(createdAt, now, {
          addSuffix: true,
        });
        return { ...comment, formattedTime };
      });
      // final
      setComment(commentTime);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCommentAndUsername();
  }, []);
  return (
    <div className="mt-4">
      {loading && <Spinner/>}
      <div className="italic font-light text-2xl">
        Total Comments - {comments.length}
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="flex mt-2">
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={'../../public/the-human-icon-and-logo-vector.jpg'}
                alt={comment.username}
              />
            </div>
            <div className="flex-1 border bg-indigo-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>{comment.username}</strong>
              <span className="text-xs text-gray-400 ms-2">
                {comment.formattedTime}
              </span>
              <p className="text-sm">{comment.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowComment;
