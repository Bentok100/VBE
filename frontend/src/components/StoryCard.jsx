import React from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function StoryCard() {
  const { storyData } = useSelector((state) => state.story);
  return (
    <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
      <div className="flex items-center gap-[10px]">
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={storyData?.author?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="w-[120px] font-semibold truncate text-white ">
          {storyData?.author?.userName}
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
