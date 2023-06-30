import React, { useState } from "react";
import "./ChatContainer.css";
import backSign from '../pics/backSign.png';
import searchSign from '../pics/searchSign.png';
import moreOptionsSign from '../pics/moreOptionsSign.png';
import Chats from './Chats/Chats'
import QuerieDisplay from './Queries/QueryDisplay.js'

const ChatContainer = () => {
  const [activeTab, setActiveTab] = useState("chats");

  const selectedTabStyle = {
    borderBottom: "3px solid black",
    borderRadius: "3px",
  };

  return (
    <div className="ChatConatainer">
      <div className="Header">
        <button className="HeaderButtons">
          <img src={backSign} alt="NA" />
        </button>
        <label>My Heading</label>
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
          onClick={() => setActiveTab("chats")}
        >
          Chats
        </button>
        <button 
          style={activeTab === "queries" ? selectedTabStyle : null}
          onClick={() => setActiveTab("queries")}
        >
          Queries
        </button>
      </div>
      {activeTab === "chats" ? <Chats /> : <QuerieDisplay />}
    </div>
  );
};

export default ChatContainer;
