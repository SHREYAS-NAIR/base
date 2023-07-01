import React from "react";
import "./Chats.css";
import Advertisements from "./Advertisements";
import ChatingPortion from "./ChatingPortion";

function Chats({ username, room, messageList, setMessageList }) {
  return (
    <div className="InsideChat">
      <Advertisements />
      <ChatingPortion
        room={room}
        username={username}
        messageList={messageList}
        setMessageList={setMessageList}
      />
    </div>
  );
}

export default Chats;
