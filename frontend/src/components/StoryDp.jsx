import React from "react";
import dp from "../assets/dp.webp";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StoryDp({ ProfileImage, userName, story }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleClick = () => {
    if (!story && userName == "Your Self") {
      navigate("/upload");
    } else if (story && userName == "Your Self") {
      navigate(`/story/${userData.userName}`);
    }
  };

  return (
    <div className="flex flex-col w-[80px]">
      <div
        className={`w-[80px] h-[80px] ${
          story ? "bg-gradient-to-b from-blue-500 to-blue-950" : ""
        } rounded-full flex justify-center items-center relative`}
        onClick={handleClick}
      >
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={ProfileImage || dp}
            alt=""
            className="w-full object-cover"
          />
          {!story && userName == "Your Self" && (
            <div>
              <FiPlusCircle className="text-black absolute bottom-[10px] bg-white right-[10px] rounded-full w-[22px] h-[22px]" />{" "}
            </div>
          )}
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full text-white">
        {userName}
      </div>
    </div>
  );
}

export default StoryDp;
