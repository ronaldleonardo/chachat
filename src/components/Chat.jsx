import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { DisplayNoneContext } from "../context/DisplayNoneContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { displayNone } = useContext(DisplayNoneContext);
  const { dispatchDisplay } = useContext(DisplayNoneContext);

  const hideTheDisplay = (a) => {
    dispatchDisplay({ type: "DISPLAY_NONE", payload: a });
  };

  return (
    <div className={`chat ${Object.entries(displayNone)[0][1] === false && "hiddenMobile"}`}>
      <div className="chatInfo">
        <button className="backToFriends" onClick={()=> hideTheDisplay(false)}>&#8592; Back</button>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
