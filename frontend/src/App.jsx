import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { serverURL } from "./config";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser";
import getSuggestedUser from "./hooks/getSuggestedUser";
import Profile from "./pages/Profile";
import Story from "./pages/Story";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import Loops from "./pages/Loops";
import getAllPost from "./hooks/getAllPost";
import getAllLoop from "./hooks/getAllLoops";
import Messages from "./pages/Messages";
import MessageArea from "./pages/MessageArea";
import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "./redux/socketSlice";
import getFollowingList from "./hooks/getFollowingList";
import getPrevChatUsers from "./hooks/getPrevChatUsers";
import getAllStories from "./hooks/getAllStories";

function App() {
  getCurrentUser();
  getSuggestedUser();
  getAllPost();
  getAllLoop();
  getFollowingList();
  getPrevChatUsers();
  getAllStories();
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  useEffect(() => {
  let socketIo;

  if (userData) {
    socketIo = io(serverURL, {
      query: {
        userId: userData._id,
      },
    });

    socketIo.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
      console.log(users);
    });

    return () => socketIo.close();
  }
}, [userData]);


  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      ></Route>
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      ></Route>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      ></Route>
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/story/:userName"
        element={userData ? <Story /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/messages"
        element={userData ? <Messages /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/messageArea"
        element={userData ? <MessageArea /> : <Navigate to={"/signin"} />}
      ></Route>
      <Route
        path="/loops"
        element={userData ? <Loops /> : <Navigate to={"/signin"} />}
      ></Route>
    </Routes>
  );
}

export default App;