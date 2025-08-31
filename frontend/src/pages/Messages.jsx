import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/OnlineUser";
import { setSelectedUser } from "../redux/messageSlice";
import dp from "../assets/dp.webp";

function Messages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const { prevChatUsers = [] } = useSelector((state) => state.message);

  return (
    <div className="w-full min-h-screen flex flex-col bg-black gap-5 p-2.5">
      <div className="w-full flex items-center gap-5 px-5 py-3.5">
        <MdOutlineKeyboardBackspace
          className="text-white lg:hidden cursor-pointer w-6 h-6"
          onClick={() => navigate("/")}
        />
        <h1 className="text-white text-xl font-semibold">Messages</h1>
      </div>

      <div className="w-full h-20 flex gap-5 items-center overflow-x-auto p-5 border-b-2 border-gray-800">
        {userData?.following?.map((user) =>
          onlineUsers?.includes(user._id) ? (
            <OnlineUser key={user._id} user={user} />
          ) : null
        )}
      </div>

      <div className="w-full flex-1 overflow-auto flex flex-col gap-5">
        {prevChatUsers?.map((user) => (
          <div
            key={user._id}
            className="text-white cursor-pointer w-full flex items-center gap-2.5 px-4"
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messageArea");
            }}
          >
            {onlineUsers?.includes(user._id) ? (
              <OnlineUser user={user} />
            ) : (
              <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden">
                <img
                  src={user.profileImage || dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-white text-lg font-semibold">
                {user.userName}
              </div>
              {onlineUsers?.includes(user._id) && (
                <div className="text-blue-500 text-sm">Active Now</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
