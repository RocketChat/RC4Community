import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { RiMic2Line } from "react-icons/ri";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

import { MdCameraswitch, MdHeadset } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import styles from "../../styles/Jitsi.module.css";
import { FaRocketchat } from "react-icons/fa";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk").then((mod) => mod.JitsiMeeting),
  { ssr: false }
);

let rtmp = process.env.NEXT_PUBLIC_ROCKET_CHAT_GREENROOM_RTMP;

const Jitsibroadcaster = ({ room, disName, rtmpSrc, handleChat, isAdmin }) => {
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);
  const [mute, setMute] = useState(false);

  const printEventOutput = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog((items) => [...items, `${feature} off`]);
      setMute(true);
    } else {
      updateLog((items) => [...items, `${feature} on`]);
      setMute(false);
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
    iframeRef.style.height = "25em";
    iframeRef.style.width = "75%";
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

  const renderStream = (key) => {
    if (!isAdmin) {
      return <div></div>;
    }

    return (
      <div className={styles.streamButton}>
        <ButtonGroup className="m-auto">
          <Button
            variant="warning"
            title="Click to start streaming"
            onClick={() =>
              apiRef.current.executeCommand("startRecording", {
                mode: "stream",
                rtmpStreamKey: key,
                youtubeStreamKey: "",
              })
            }
          >
            Go live!
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  const toggleDevice = () => (
    <div className={styles.device}>
      <Button disabled variant="light">
        <AiFillSetting size={20} />
      </Button>
      <ButtonGroup vertical className="m-auto">
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Microphone Device</Tooltip>}
        >
          <Button
            title="Click to switch audio devices"
            onClick={() => showAudioDevice(apiRef)}
          >
            <RiMic2Line size={20} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Camera Device</Tooltip>}
        >
          <Button
            title="Click to switch video devices"
            onClick={() => showDevices(apiRef)}
          >
            <MdCameraswitch size={20} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Audio Device</Tooltip>}
        >
          <Button
            title="Click to switch audio devices"
            onClick={() => showAudioOutDevices(apiRef)}
          >
            <MdHeadset size={20} />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </div>
  );

  const toolButton = () => (
    <div className={styles.deviceButton}>
      <ButtonGroup className="m-auto">
        <Button
          variant="success"
          title="Click to toogle audio"
          onClick={() => {
            apiRef.current.executeCommand("toggleAudio");
          }}
        >
          {mute ? <BiMicrophoneOff /> : <BiMicrophone />}
        </Button>
        <DropdownButton variant="danger" as={ButtonGroup} title="End">
          <Dropdown.Item
            as="button"
            onClick={() => apiRef.current.executeCommand("hangup")}
          >
            Leave Meet
          </Dropdown.Item>
          <Dropdown.Item
            variant="danger"
            as="button"
            onClick={() => apiRef.current.stopRecording("stream")}
            disabled={!isAdmin}
          >
            End for everyone!
          </Dropdown.Item>
        </DropdownButton>
        <Button color="#f5455c" onClick={handleChat}>
          <FaRocketchat />
        </Button>
      </ButtonGroup>
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
      {rtmp ? renderStream(rtmp) : rtmpSrc && renderStream(rtmpSrc)}
      <div className={styles.jitsiContainer}>
        {toggleDevice()}

        <JitsiMeeting
          domain="meet.jit.si"
          roomName={room}
          spinner={renderSpinner}
          onApiReady={(externalApi) => handleApiReady(externalApi, apiRef)}
          getIFrameRef={handleJitsiIFrameRef1}
          configOverwrite={{
            startWithAudioMuted: false,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            toolbarButtons: [],
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            startWithVideoMuted: false,
            liveStreamingEnabled: true,
            disableTileView: false,
            disableShortcuts: true,
            disable1On1Mode: true,
            p2p: {
              enabled: false,
            },
            disableRemoteMute: true,
            remoteVideoMenu: {
              disableKick: true,
            },
            filmstrip: {
              disableResizable: true,
              disableStageFilmstrip: true,
            },
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            FILM_STRIP_MAX_HEIGHT: 0,
            TILE_VIEW_MAX_COLUMNS: 0,
            VIDEO_QUALITY_LABEL_DISABLED: true,
            VERTICAL_FILMSTRIP: true,
          }}
          userInfo={{
            displayName: disName,
          }}
        />
      </div>
      {toolButton()}
      <div className={styles.log}>{renderLog()}</div>
    </>
  );
};

export default Jitsibroadcaster;
