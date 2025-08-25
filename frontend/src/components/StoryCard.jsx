import React, { useEffect, useState } from "react";
import dp from "../assets/dp.webp";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import VideoPlayer from "./VideoPlayer";

function StoryCard({ storyData }) {
  const { userData } = useSelector((state) => state.user);
  const [showViewers, setShowViewers] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (showViewers) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [navigate, showViewers]);

  const isSelf = storyData?.author?.userName === userData?.userName;

  const renderMedia = () => {
    if (storyData.mediaType === "image") {
      return (
        <img
          src={storyData?.media}
          alt="story"
          className="w-[80%] rounded-2xl object-cover"
        />
      );
    }
    if (storyData.mediaType === "video") {
      return (
        <div className="w-[80%] flex flex-col items-center justify-center">
          <VideoPlayer media={storyData?.media} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center bg-black">
      {!showViewers && (
        <div className="absolute top-[10px] w-full h-[5px] bg-gray-900">
          <div
            className="h-full bg-white transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-[10px] absolute top-[30px] px-[10px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate("/")}
        />
        <div className="w-[40px] h-[40px] border-2 border-black rounded-full overflow-hidden">
          <img
            src={storyData?.author?.profileImage || dp}
            alt="profile"
            className="w-full object-cover"
          />
        </div>
        <div className="w-[120px] font-semibold truncate text-white">
          {storyData?.author?.userName}
        </div>
      </div>

      {!showViewers && (
        <div className="w-full h-[90vh] flex items-center justify-center">
          {renderMedia()}
        </div>
      )}

      {!showViewers && isSelf && (
        <div
          className="w-full h-[70px] flex text-white items-center gap-[10px] absolute left-0 p-2 bottom-0"
          onClick={() => setShowViewers(true)}
        >
          <div className="text-white flex items-center gap-[5px]">
            <FaEye />
            {storyData.viewers.length}
          </div>
          <div className="flex relative">
            {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
              <div
                key={viewer?._id || index}
                className="w-[30px] h-[30px] border-2 border-black rounded-full overflow-hidden"
                style={{
                  position: index > 0 ? "absolute" : "relative",
                  left: `${index * 9}px`,
                }}
              >
                <img
                  src={viewer?.profileImage || dp}
                  alt="viewer"
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showViewers && (
        <>
          <div
            className="w-full h-[40%] flex items-center justify-center mt-[60px] py-[30px]"
            onClick={() => setShowViewers(false)}
          >
            {renderMedia()}
          </div>

          <div className="w-full h-[60%] border-t-2 border-gray-800 p-[20px] overflow-y-auto">
            <div className="text-white flex items-center gap-[10px] mb-4">
              <FaEye />
              <span>{storyData.viewers.length}</span>
              <span>Viewers</span>
            </div>

            {storyData.viewers.map((viewer, index) => (
              <div
                key={viewer?._id || index}
                className="flex items-center gap-3 mb-2 text-white"
              >
                <img
                  src={viewer?.profileImage || dp}
                  alt="viewer"
                  className="w-[30px] h-[30px] rounded-full object-cover border border-white"
                />
                <span>{viewer?.userName}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StoryCard;
