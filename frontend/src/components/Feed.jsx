import React from "react";
import logo from "../assets/Right.jpeg";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";
import { BiMessageAltDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh]  relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden ">
        <img src={logo} alt="" className="w-[80px]" />
        <div className="flex items-center gap-[10px] ">
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
          <BiMessageAltDetail
            className="text-[white] w-[25px] h-[25px]"
            onClick={() => navigate("/messages")}
          />
        </div>
      </div>
      <div className="flex w-full overflow-auto gap-[20px] items-center p-[10px]">
        <StoryDp
          userName={"Your Self"}
          ProfileImage={userData.ProfileImage}
          story={userData.story}
        />
      </div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[20px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />

        {postData?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
