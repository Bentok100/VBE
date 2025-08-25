import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import { setFollowing, setUserData } from "../redux/userSlice";

function getCurrentUser() {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/user/current`, {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));

        if (Array.isArray(result.data.following)) {
          dispatch(setFollowing(result.data.following));
        } else {
          dispatch(setFollowing([]));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [storyData]);
}

export default getCurrentUser;
