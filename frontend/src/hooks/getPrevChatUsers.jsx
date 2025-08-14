import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../config";
import axios from "axios";
import { setPrevChatUsers } from "../redux/messageSlice";

function getPrevChatUsers() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/message/prevChats`, {
          withCredentials: true,
        });
        dispatch(setPrevChatUsers(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [messages]);
}

export default getPrevChatUsers;