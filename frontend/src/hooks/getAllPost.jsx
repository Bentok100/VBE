import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import { setPostData } from "../redux/postSlice";

function getAllPost() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/post/getAll`, {
          withCredentials: true,
        });
        dispatch(setPostData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [dispatch, userData]);
}

export default getAllPost;