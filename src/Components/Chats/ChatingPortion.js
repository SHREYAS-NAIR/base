import React, { useState } from "react";
import "./ChatingPortion.css";
import close from "../../pics/close.png";
import uploadSign from "../../pics/upload.png";
import sendSign from "../../pics/send.png";
import photo from "../../pics/photo.png";
import video from "../../pics/video.png";
import audio from "../../pics/audio.png";
import query from "../../pics/query.png";

function ChatingPortion() {
  const [message, setMessage] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const handleSend = () => {
    // handle sending the message here
    setMessage("");
  };

  const handleUploadOpen = () => {
    setUploadOpen(!uploadOpen);
  };
  return (
    <div className="ChatingPortion">
      <div className="ChatDisplay">
        <div className="MessagesDisplayC">
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
          <div className="ReceivedMessage">Hello there</div>
          <div className="SentMessage">Hi, how are you?</div>
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
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
          />
        </div>
        <div className="Part2">
          <button className="SendButton" onClick={handleSend}>
            <img src={sendSign} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatingPortion;
