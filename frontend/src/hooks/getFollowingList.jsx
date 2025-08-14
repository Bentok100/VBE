import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import { setFollowing, setUserData } from "../redux/userSlice";

function getFollowingList() {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/user/followingList`, {
          withCredentials: true,
        });
        dispatch(setFollowing(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [storyData]);
}

export default getFollowingList;