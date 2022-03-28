import { JitsiMeeting } from "@jitsi/react-sdk";

import { useRef, useState } from "react";

const Jitsi = ({ password, subject }) => {
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand("toggleChat");
    updateLog((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
    console.log(logItems);
  };

  const handleRec = (payload) => {
      console.log("viii", payload.error)
  }

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = "10px solid #3d3d3d";
    iframeRef.style.background = "#3d3d3d";
    iframeRef.style.height = "35em";
    iframeRef.style.margin = "auto";
    iframeRef.style.width = "90%";
  };

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    apiRef.current.addEventListeners({
      // Listening to events from the external API
      chatUpdated: handleChatUpdates,
      recordingStatusChanged: handleRec
    });

    apiRef.current.addEventListener("participantRoleChanged", function (event) {
      if (event.role === "moderator") {
        apiRef.current.executeCommand("password", password);
      }
    });

    apiRef.current.on("passwordRequired", function () {
      apiRef.current.executeCommand("password", password);
    });
  };

  const handleReadyToClose = () => {
    const iframe = apiRef.current.getIFrame();
    iframe.src = iframe.src;
  };


  const generateRoomName = () => `${subject}_${Date.now()}`;

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      Loading..
    </div>
  );

  const renderButtons = () => (
    <div style={{ margin: "15px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="text"
          title="Click to execute toggle raise hand command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#f8ae1a",
            color: "#040404",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() => apiRef.current.executeCommand("toggleRaiseHand")}
        >
          Raise hand
        </button>

        <button
          type="text"
          title="Click to execute subject command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#f8ae1a",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            apiRef.current.executeCommand("startRecording", {
                mode: "stream",
                rtmpStreamKey: "rtmp://bkk.contribute.live-video.net/app/live_782944617_jO1n8FKi51La1btVI3LXCTFinu04lS",
                youtubeStreamKey: ""
            })
          }
        >
          Go live
        </button>
        <button
          type="text"
          title="Click to execute subject command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "red",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            apiRef.current.stopRecording("stream")
          }
        >
          Stop stream
        </button>
      </div>
    </div>
  );

  return (
    <>
      <JitsiMeeting
        roomName={generateRoomName()}
        spinner={renderSpinner}
        config={{
          subject: subject,
          hideConferenceSubject: false,
        }}
        onApiReady={(externalApi) => handleApiReady(externalApi)}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1}
      />
      {renderButtons()}
    </>
  );
};

export default Jitsi;
