import React, { useEffect, useState } from "react";
import dp from "../assets/dp.webp";
import VideoPlayer from "./VideoPlayer";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineComment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import { serverURL } from "../config.js";
import { setPostData } from "../redux/postSlice.js";
import { setUserData } from "../redux/userSlice.js";
import FollowButton from "./FollowButton.jsx";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const { socket } = useSelector((state) => state.socket);

  const [showComment, setShowComment] = useState(true);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------------- LINK DETECTION FUNCTION ----------------

  const renderCaption = (text) => {
    const urlRegex = /((https?:\/\/)?(www\.)?[^\s]+\.[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith("http")
          ? part
          : `https://${part}`;

        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {part}
          </a>
        );
      }

      return part;
    });
  };

  // ---------------- LIKE FUNCTION ----------------

  const handleLike = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/post/like/${post._id}`,
        {
          withCredentials: true,
        }
      );

      const updatedPost = result.data;

      const updatedPosts = postData.map((p) =>
        p._id == post._id ? updatedPost : p
      );

      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- COMMENT FUNCTION ----------------

  const handleComment = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/post/comment/${post._id}`,
        { message },
        { withCredentials: true }
      );

      const updatedPost = result.data;

      const updatedPosts = postData.map((p) =>
        p._id == post._id ? updatedPost : p
      );

      dispatch(setPostData(updatedPosts));

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- SAVE FUNCTION ----------------

  const handleSaved = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/post/saved/${post._id}`,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error.response);
    }
  };

  // ---------------- SOCKETS ----------------

  useEffect(() => {
    socket?.on("likedPost", (updatedData) => {
      const updatedPosts = postData.map((p) =>
        p._id == updatedData.postId
          ? { ...p, likes: updatedData.likes }
          : p
      );

      dispatch(setPostData(updatedPosts));
    });

    socket?.on("commentedPost", (updatedData) => {
      const updatedPosts = postData.map((p) =>
        p._id == updatedData.postId
          ? { ...p, comments: updatedData.comments }
          : p
      );

      dispatch(setPostData(updatedPosts));
    });

    return () => {
      socket?.off("likedPost");
      socket?.off("commentedPost");
    };
  }, [socket, postData, dispatch]);

  return (
    <div className="w-[90%] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]">

      {/* ---------------- TOP SECTION ---------------- */}

      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div
          className="flex justify-center items-center gap-[10px] md:gap-[20px] cursor-pointer"
          onClick={() => navigate(`/profile/${post.author?.userName}`)}
        >
          <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full overflow-hidden">
            <img
              src={post.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>

          <div className="w-[150px] font-semibold truncate">
            {post.author?.userName}
          </div>
        </div>

        {userData?._id != post.author?._id && (
          <FollowButton
            tailwind="px-[10px] w-[60px] md:min-w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl text-[14px] md:text-[16px]"
            targetUserId={post.author?._id}
          />
        )}
      </div>

      {/* ---------------- MEDIA SECTION ---------------- */}

      <div className="w-[90%] flex items-center justify-center">

        {post.mediaType == "image" && (
          <div className="w-[90%] flex items-center justify-center">
            <img
              src={post.media}
              alt=""
              className="w-[80%] rounded-2xl object-cover"
            />
          </div>
        )}

        {post.mediaType == "video" && (
          <div className="w-[80%] flex flex-col items-center justify-center">
            <VideoPlayer media={post.media} />
          </div>
        )}
      </div>

      {/* ---------------- ACTION BUTTONS ---------------- */}

      <div className="w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px]">

        <div className="flex justify-center items-center gap-[10px]">

          {/* LIKE */}

          <div className="flex justify-center items-center gap-[5px]">

            {!post.likes.includes(userData._id) && (
              <GoHeart
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={handleLike}
              />
            )}

            {post.likes.includes(userData._id) && (
              <GoHeartFill
                className="w-[25px] h-[25px] cursor-pointer text-red-600"
                onClick={handleLike}
              />
            )}

            <span>{post.likes.length}</span>
          </div>

          {/* COMMENT */}

          <div
            className="flex justify-center items-center gap-[5px] cursor-pointer"
            onClick={() => setShowComment((prev) => !prev)}
          >
            <MdOutlineComment className="w-[25px] h-[25px]" />
            <span>{post.comments.length}</span>
          </div>
        </div>

        {/* SAVE */}

        <div onClick={handleSaved} className="cursor-pointer">

          {!userData.saved.includes(post?._id) && (
            <MdOutlineBookmarkBorder className="w-[25px] h-[25px]" />
          )}

          {userData.saved.includes(post?._id) && (
            <GoBookmarkFill className="w-[25px] h-[25px]" />
          )}
        </div>
      </div>

      {/* ---------------- CAPTION SECTION ---------------- */}

      {post.caption && (
        <div className="w-full px-[20px] gap-[10px] flex justify-start items-start flex-wrap">
          
          <h1 className="font-semibold">
            {post.author?.userName}
          </h1>

          <div className="break-words">
            {renderCaption(post.caption)}
          </div>
        </div>
      )}

      {/* ---------------- COMMENT SECTION ---------------- */}

      {showComment && (
        <div className="w-full flex flex-col gap-[30px] pb-[20px]">

          {/* COMMENT INPUT */}

          <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">

            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full overflow-hidden">
              <img
                src={post.author?.profileImage || dp}
                alt=""
                className="w-full object-cover"
              />
            </div>

            <input
              type="text"
              className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px]"
              placeholder="Write Comment..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            <button
              className="absolute right-[20px] cursor-pointer"
              onClick={handleComment}
            >
              <IoSendSharp className="w-[25px] h-[25px]" />
            </button>
          </div>

          {/* COMMENTS LIST */}

          <div className="w-full max-h-[300px] overflow-auto">

            {post.comments?.map((com, index) => (
              <div
                key={index}
                className="w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2 border-b-gray-200"
              >
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full overflow-hidden">
                  <img
                    src={com.author?.profileImage || dp}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>

                <div>{com.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
