import React, { useState, useEffect} from "react";
import "./ChatingPortion.css";
import close from "../../pics/close.png";
import uploadSign from "../../pics/upload.png";
import sendSign from "../../pics/send.png";
import photo from "../../pics/photo.png";
import video from "../../pics/video.png";
import audio from "../../pics/audio.png";
import query from "../../pics/query.png";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:3001");

function ChatingPortion({ username, room, messageList, setMessageList }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleSend = async () => {
    console.log(username);
    if (message !== "") {
      const messageData = {
        room: room,
        messageSent: message,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
    setMessage("");
  };

  useEffect(() => {
    const handleMessage = (data) => {
      if(data.room === room) { 
        setMessageList((list) => [...list, data]);
      }
    };
  
    socket.on("receive-message", handleMessage);
  
    // Cleanup function
    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [socket, room]);
  

  const handleUploadOpen = () => {
    setUploadOpen(!uploadOpen);
  };
  return (
    <div className="ChatingPortion">
      <div className="ChatDisplay">
        <div className="MessagesDisplayC">
          <ScrollToBottom className="MessagesDisplayC">
            {messageList.map((messageContent) => {
              return (
                <div
                  className={
                    username === messageContent.author
                      ? "SentMessage"
                      : "ReceivedMessage"
                  }
                >
                  <div className="messageBox">
                    <div className="message-meta">
                      <p>{messageContent.time}</p>
                      <p>{messageContent.author}</p>
                    </div>
                    <div className="message-content">
                      <p>{messageContent.messageSent}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
          <div />
        </div>
        {uploadOpen && (
          <div className="UploadOptions">
            <div className="uploadOptionsElements">
              <button className="Element1">
                <img src={photo} alt="" />
              </button>
              <label>Photos</label>
            </div>
            <div className="uploadOptionsElements">
              <button className="Element2">
                <img src={video} alt="" />
              </button>
              <label>Video</label>
            </div>
            <div className="uploadOptionsElements">
              <button className="Element3">
                <img src={audio} alt="" />
              </button>
              <label>Audio</label>
            </div>
            <div className="uploadOptionsElements">
              <button className="Element4">
                <img className="queryimage" src={query} alt="" />
              </button>
              <label>Query</label>
            </div>
          </div>
        )}
      </div>
      <div className="InputBox">
        <div className="Part1">
          <button className="UploadButton" onClick={handleUploadOpen}>
            {uploadOpen ? (
              <div className="CloseSign">
                <img src={close} alt="Close" />
              </div>
            ) : (
              <div className="UploadSign">
                <img src={uploadSign} alt="Upload" />
              </div>
            )}
          </button>
          <input
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && handleSend() && joinRoom();
            }}
            placeholder="Write a message..."
          />
        </div>
        <div className="Part2">
          <button
            className="SendButton"
            onClick={() => {
              handleSend();
              joinRoom();
            }}
          >
            <img src={sendSign} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatingPortion;
