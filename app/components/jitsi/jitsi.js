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
    console.log(logItems)
  };

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

  return (
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
  );
};

export default Jitsi;