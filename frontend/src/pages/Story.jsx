import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverURL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";
import StoryCard from "../components/StoryCard";

function Story() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const storyData = useSelector((state) => state.story.storyData);

  useEffect(() => {
    const handleStory = async () => {
      dispatch(setStoryData(null));
      try {
        const result = await axios.get(
          `${serverURL}/api/story/getByUserName/${userName}`,
          { withCredentials: true }
        );
        if (Array.isArray(result.data) && result.data.length > 0) {
          dispatch(setStoryData(result.data[0]));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userName) {
      handleStory();
    }
  }, [userName, dispatch]);

  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      {storyData && <StoryCard storyData={storyData} />}
    </div>
  );
}

export default Story;
