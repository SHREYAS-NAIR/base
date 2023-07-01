import React from "react";
import "./Chats.css";
import Advertisements from "./Advertisements";
import ChatingPortion from "./ChatingPortion";

function Chats({ username, room, messageList, setMessageList, setActiveTab, setRoom }) {
  return (
    <div className="InsideChat">
      <Advertisements />
      <ChatingPortion
        room={room}
        username={username}
        messageList={messageList}
        setMessageList={setMessageList}
        setActiveTab={setActiveTab}
        setRoom={setRoom}
      />
    </div>
  );
}

export default Chats;
