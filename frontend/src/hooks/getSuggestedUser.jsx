import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import { setSuggestedUsers } from "../redux/userSlice";

function getSuggestedUser() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/user/suggested`, {
          withCredentials: true,
        });
        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
}

export default getSuggestedUser;