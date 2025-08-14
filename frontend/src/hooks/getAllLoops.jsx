import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import { setLoopData } from "../redux/loopSlice";
import axios from "axios";

function getAllLoop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLoop = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/loop/getAll`, {
          withCredentials: true,
        });
        dispatch(setLoopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoop();
  }, [dispatch, userData]);
}

export default getAllLoop;
