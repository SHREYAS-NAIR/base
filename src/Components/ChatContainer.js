import React, { useState, useEffect } from "react";
import "./ChatContainer.css";
import backSign from "../pics/backSign.png";
import searchSign from "../pics/searchSign.png";
import moreOptionsSign from "../pics/moreOptionsSign.png";
import Chats from "./Chats/Chats";
import QueryDisplay from "./Queries/QueryDisplay.js";

const ChatContainer = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [userType, setUserType] = useState("User");
  const [queryList, setQueryList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("1");

  const selectedTabStyle = {
    borderBottom: "3px solid black",
    borderRadius: "3px",
  };
  useEffect(() => {
    const type = prompt("Please select your user type: Admin or User");

    if (type === "Admin" || type === "User") {
      setUserType(type);
    }
  }, []);

  return (
    <div className="ChatConatainer">
      <div className="Header">
        <button className="HeaderButtons">
          <img src={backSign} alt="NA" />
        </button>
        <label>{userType} Chats</label>
        <button className="HeaderButtons">
          <img src={searchSign} alt="NA" />
        </button>
        <button className="HeaderButtons">
          <img src={moreOptionsSign} alt="NA" />
        </button>
      </div>
      <div className="Tabs">
        <button
          style={activeTab === "chats" ? selectedTabStyle : null}
          onClick={() => {
            setActiveTab("chats");
            setRoom("1");
          }}
        >
          Chats
        </button>
        <button
          style={activeTab === "queries" ? selectedTabStyle : null}
          onClick={() => {
            setActiveTab("queries");
            setRoom("2");
          }}
        >
          Queries
        </button>
      </div>
      {activeTab === "chats" ? (
        <Chats
          room={room}
          username={userType}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      ) : (
        <QueryDisplay
          room={room}
          username={userType}
          queryList={queryList}
          setQueryList={setQueryList}
        />
      )}
    </div>
  );
};

export default ChatContainer;
