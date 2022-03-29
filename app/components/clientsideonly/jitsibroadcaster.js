import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk").then((mod) => mod.JitsiMeeting),
  { ssr: false }
);

const rtmp = process.env.NEXT_PUBLIC_ROCKET_CHAT_GREENROOM_RTMP;

const Jitsibroadcaster = () => {
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);
  const [mute, setMute] = useState(true);

  const printEventOutput = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog((items) => [...items, `${feature} off`]);
    } else {
      updateLog((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload, ref) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    ref.current.executeCommand("toggleChat");
    updateLog((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
  };

  const handleKnockingParticipant = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants((participants) => [
      ...participants,
      payload?.participant,
    ]);
  };

  const resolveKnockingParticipants = (ref, condition) => {
    knockingParticipants.forEach((participant) => {
      ref.current.executeCommand(
        "answerKnockingParticipant",
        participant?.id,
        condition(participant)
      );
      updateKnockingParticipants((participants) =>
        participants.filter((item) => item.id === participant.id)
      );
    });
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = "10px solid cadetblue";
    iframeRef.style.background = "cadetblue";
    iframeRef.style.height = "720px";
    iframeRef.style.overflow = "auto";
    iframeRef.style.resize = "both";
  };

  const showDevices = async (ref) => {
    const videoInputs = [];
    // get all available video input
    const devices = await ref.current.getAvailableDevices();

    for (const [key, value] of Object.entries(devices)) {
      if (key == "videoInput") {
        value.forEach((vid) => {
          videoInputs.push(vid.label);
        });
      }
    }
    // log for debug
    updateLog((items) => [...items, JSON.stringify(videoInputs)]);

    let nextDevice = "";
    let devs = await ref.current.getCurrentDevices();

    for (const [key, value] of Object.entries(devs)) {
      if (key == "videoInput") {
        updateLog((items) => [...items, "found " + JSON.stringify(value)]);
        let devLabel = value.label;
        let idx = 0;
        videoInputs.forEach((vid) => {
          if (devLabel == vid) {
            let cur = idx + 1;
            if (cur >= videoInputs.length) {
              nextDevice = videoInputs[0];
            } else {
              nextDevice = videoInputs[cur];
              updateLog((items) => [...items, "next is " + nextDevice]);
            }
          }
          idx++;
        });
      }
    }
    updateLog((items) => [...items, "switching to " + nextDevice]);

    await ref.current.setVideoInputDevice(nextDevice);
  };

  const showAudioOutDevices = async (ref) => {
    const audioOutputs = [];
    // get all available audio output
    const devices = await ref.current.getAvailableDevices();

    for (const [key, value] of Object.entries(devices)) {
      if (key == "audioOutput") {
        value.forEach((vid) => {
          audioOutputs.push(vid.label);
        });
      }
    }
    // log for debug
    updateLog((items) => [...items, JSON.stringify(audioOutputs)]);

    let nextDevice = "";
    let devs = await ref.current.getCurrentDevices();

    for (const [key, value] of Object.entries(devs)) {
      if (key == "audioOutput") {
        updateLog((items) => [...items, "found " + JSON.stringify(value)]);
        let devLabel = value.label;
        let idx = 0;
        audioOutputs.forEach((vid) => {
          if (devLabel == vid) {
            let cur = idx + 1;
            if (cur >= audioOutputs.length) {
              nextDevice = audioOutputs[0];
            } else {
              nextDevice = audioOutputs[cur];
              updateLog((items) => [...items, "next is " + nextDevice]);
            }
          }
          idx++;
        });
      }
    }
    updateLog((items) => [...items, "switching to " + nextDevice]);

    await ref.current.setAudioOutputDevice(nextDevice);
  };

  const showAudioDevice = async (ref) => {
    const audioInputs = [];
    // get all available audio input
    const devices = await ref.current.getAvailableDevices();

    for (const [key, value] of Object.entries(devices)) {
      if (key == "audioInput") {
        value.forEach((vid) => {
          audioInputs.push(vid.label);
        });
      }
    }
    // log for debug
    updateLog((items) => [...items, JSON.stringify(audioInputs)]);

    let nextDevice = "";
    let devs = await ref.current.getCurrentDevices();

    for (const [key, value] of Object.entries(devs)) {
      if (key == "audioInput") {
        updateLog((items) => [...items, "found " + JSON.stringify(value)]);
        let devLabel = value.label;
        let idx = 0;
        audioInputs.forEach((vid) => {
          if (devLabel == vid) {
            let cur = idx + 1;
            if (cur >= audioInputs.length) {
              nextDevice = audioInputs[0];
            } else {
              nextDevice = audioInputs[cur];
              updateLog((items) => [...items, "next is " + nextDevice]);
            }
          }
          idx++;
        });
      }
    }
    updateLog((items) => [...items, "switching to " + nextDevice]);
    await ref.current.setAudioInputDevice(nextDevice);
  };

  const handleApiReady = async (apiObj, ref) => {
    ref.current = apiObj;
    await ref.current.addEventListeners({
      // Listening to events from the external API
      audioMuteStatusChanged: (payload) =>
        handleAudioStatusChange(payload, "audio"),
      videoMuteStatusChanged: (payload) =>
        handleAudioStatusChange(payload, "video"),
      raiseHandUpdated: printEventOutput,
      tileViewChanged: printEventOutput,
      chatUpdated: (payload) => handleChatUpdates(payload, ref),
      knockingParticipant: handleKnockingParticipant,
    });

    await ref.current.executeCommand("toggleFilmStrip");
  };

  // Multiple instances demo
  const showUsers = async (ref, which) => {
    const pinfo = await ref.current.getParticipantsInfo();
    updateLog((items) => [...items, "participantes " + JSON.stringify(pinfo)]);
    await ref.current.executeCommand("setTileView", false);
    await ref.current.setLargeVideoParticipant(pinfo[which].participantId);
  };

  const makeTile = (ref) => {
    ref.current.executeCommand("setTileView", true);
  };

  const renderStream = () => (
    <div style={{ margin: "15px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup className="m-auto">
          <Button
            variant="warning"
            title="Click to start streaming"
            onClick={() =>
              apiRef.current.executeCommand("startRecording", {
                mode: "stream",
                rtmpStreamKey: rtmp,
                youtubeStreamKey: "",
              })
            }
          >
            Go live!
          </Button>
          <Button
            variant="danger"
            title="Click to stop streaming"
            onClick={() => apiRef.current.stopRecording("stream")}
          >
            End Stream!
          </Button>
        </ButtonGroup>
      </div>
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
        <ButtonGroup size="sm" className="m-auto">
          <Button
            title="Click to switch audio devices"
            onClick={() => showAudioDevice(apiRef)}
          >
            Microphone Devices
          </Button>
          <Button
            title="Click to switch video devices"
            onClick={() => showDevices(apiRef)}
          >
            Camera Devices
          </Button>
          <Button
            title="Click to switch audio devices"
            onClick={() => showAudioOutDevices(apiRef)}
          >
            Speaker Devices
          </Button>
        </ButtonGroup>
        <ButtonGroup className="m-auto">
          <Button
            variant="success"
            title="Click to toogle audio"
            onClick={() => {
              apiRef.current.executeCommand("toggleAudio");
              setMute(!mute);
            }}
          >
            {mute ? <BiMicrophoneOff /> : <BiMicrophone />}
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="m-auto">
          <Button
            variant="secondary"
            onClick={() => makeTile(apiRef)}
            title="Click to toggle tile view"
          >
            Tile View
          </Button>
          <Button onClick={() => showUsers(apiRef, 0)} variant="secondary">
            First User
          </Button>
          <Button onClick={() => showUsers(apiRef, 1)} variant="secondary">
            Second User
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );

  const renderLog = () =>
    logItems.map((item, index) => (
      <div
        style={{
          fontFamily: "monospace",
          padding: "5px",
        }}
        key={index}
      >
        {item}
      </div>
    ));

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
    <>
      <h1
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      ></h1>
            {rtmp && renderStream()}
        <JitsiMeeting
          domain="meet.jit.si"
          roomName="whataroom987654321"
          spinner={renderSpinner}
          onApiReady={(externalApi) => handleApiReady(externalApi, apiRef)}
          getIFrameRef={handleJitsiIFrameRef1}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            toolbarButtons: [],
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            startWithVideoMuted: false,
            liveStreamingEnabled: true,
            disableSelfView: false,
            disableSelfViewSettings: true,
            disableShortcuts: true,
            disable1On1Mode: true,
            p2p: {
              enabled: false,
            },
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            FILM_STRIP_MAX_HEIGHT: 0,
            TILE_VIEW_MAX_COLUMNS: 0,
            VIDEO_QUALITY_LABEL_DISABLED: true,
          }}
          userInfo={{
            displayName: "Sing",
          }}
        />
      {renderButtons()}
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {renderLog()}
      </div>
    </>
  );
};

export default Jitsibroadcaster;
