import React, { useState, useEffect, useRef } from "react";
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

function ChatingPortion({
  username,
  room,
  messageList,
  setMessageList,
  setActiveTab,
  setRoom,
}) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [message, setMessage] = useState("");
  const photoInputRef = useRef();
  const videoInputRef = useRef();
  const audioInputRef = useRef();

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
        file: null,
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
    joinRoom();

    const handleMessage = (data) => {
      if (data.room === room) {
        setMessageList((list) => [...list, data]);
      }
    };

    socket.on("receive-message", handleMessage);

    socket.on("receive-file", (data) => {
      console.log("Received file event", data); // Add this line
      setMessageList((list) => [
        ...list,
        {
          ...data,
          file: data.file,
        },
      ]);
    });

    // Cleanup function
    return () => {
      socket.off("receive-message", handleMessage);
      socket.off("receive-file");
    };
  }, [socket, room]);

  const handleUploadOpen = () => {
    setUploadOpen(!uploadOpen);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = reader.result;

      const fileData = {
        room: room,
        messageSent: "Sent",
        author: username,
        file: base64data,
        fileName: file.name,
        fileType: file.type,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("upload-file", fileData);

      // Adding the file data to the local state so it's displayed immediately
      setMessageList((list) => [...list, fileData]);
    };

    reader.readAsDataURL(file);
  };

  const handlePhotoUploadClick = () => {
    photoInputRef.current.click();
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };

  const handleAudioUploadClick = () => {
    audioInputRef.current.click();
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
                      {messageContent.file && (
                        <div>
                          {messageContent.fileType.startsWith("image") ? (
                            <div>
                              <img src={messageContent.file} alt="" />
                              <a
                                href={messageContent.file}
                                download={messageContent.fileName}
                              >
                                Download Image
                              </a>
                            </div>
                          ) : messageContent.fileType.startsWith("video") ? (
                            <video controls src={messageContent.file} />
                          ) : messageContent.fileType.startsWith("audio") ? (
                            <audio controls src={messageContent.file} />
                          ) : null}
                        </div>
                      )}
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
              <button className="Element1" onClick={handlePhotoUploadClick}>
                <img src={photo} alt="" />
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={photoInputRef}
                onChange={handleFileUpload}
              />
              <label>Photos</label>
            </div>
            <div className="uploadOptionsElements">
              <button className="Element2" onClick={handleVideoUploadClick}>
                <img src={video} alt="" />
              </button>
              <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                ref={videoInputRef}
                onChange={handleFileUpload}
              />
              <label>Video</label>
            </div>
            <div className="uploadOptionsElements">
              <button className="Element3" onClick={handleAudioUploadClick}>
                <img src={audio} alt="" />
              </button>
              <input
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                ref={audioInputRef}
                onChange={handleFileUpload}
              />
              <label>Audio</label>
            </div>
            <div className="uploadOptionsElements">
              <button
                className="Element4"
                onClick={() => {setActiveTab("queries"); setRoom("2")}}
              >
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
