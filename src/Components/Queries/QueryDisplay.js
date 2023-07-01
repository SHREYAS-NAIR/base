import React, { useState, useEffect } from "react";
import "./QueryDisplay.css";
import ScrollToBottom from "react-scroll-to-bottom";
import uploadSign from "../../pics/upload.png";
import sendSign from "../../pics/send.png";
import close from "../../pics/close.png";
import io from "socket.io-client";
import photo from "../../pics/photo.png";
import video from "../../pics/video.png";
import audio from "../../pics/audio.png";

const socket = io.connect("http://localhost:3001");

function QueryDisplay({ username, room, queryList, setQueryList }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [query, setQuery] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleSend = async () => {
    console.log(username);
    if (query !== "") {
      const messageData = {
        room: room,
        messageSent: query,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setQueryList((list) => [...list, messageData]);
    }
    setQuery("");
  };

  const handleUploadOpen = () => {
    setUploadOpen(!uploadOpen);
  };

  useEffect(() => {
    const handleMessage = (data) => {
      if (data.room === room) {
        setQueryList((list) => [...list, data]);
      }
    };

    socket.on("receive-message", handleMessage);

    // Cleanup function
    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [socket, room]);

  return (
    <div className="QueryBox">
      <div className="MessagesDisplayQ" style={{height:"83%"}}>
        <ScrollToBottom className="MessagesDisplayQ">
          {queryList.map((messageContent) => {
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
          </div>
        )}
      </div>
      <div className="InputBox1">
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
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && handleSend() && joinRoom();
            }}
            placeholder="Post a query..."
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

export default QueryDisplay;
