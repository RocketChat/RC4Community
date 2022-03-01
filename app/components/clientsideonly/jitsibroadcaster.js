
import dynamic from 'next/dynamic'
import React, { useRef, useState } from 'react'


const JitsiMeeting = dynamic( () => import('@jitsi/web-sdk').then((mod) => mod.JitsiMeeting) ,  {ssr: false } )


const Jitsibroadcaster = () => {
    const apiRef = useRef();
    const apiRefNew = useRef();
    const [ logItems, updateLog ] = useState([]);
    const [ showNew, toggleShowNew ] = useState(false);
    const [ knockingParticipants, updateKnockingParticipants ] = useState([]);

    const printEventOutput = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [ ...items, `${feature} off` ])
        } else {
            updateLog(items => [ ...items, `${feature} on` ])
        }
    };

    const handleChatUpdates = (payload, ref) => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        ref.current.executeCommand('toggleChat');
        updateLog(items => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    };

    const handleKnockingParticipant = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
        updateKnockingParticipants(participants => [ ...participants, payload?.participant ])
    };

    const resolveKnockingParticipants = (ref, condition) => {
        knockingParticipants.forEach(participant => {
            ref.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
            updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
        });
    };

    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid cadetblue';
        iframeRef.style.background = 'cadetblue';
        iframeRef.style.height = '720px';
    };

    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed tomato';
        iframeRef.style.padding = '5px';
        iframeRef.style.height = '400px';
    };


    const showDevices =  async (ref) => {
        const videoInputs = [];
        let currentDevice = "";
        // get all available video input
        const devices = await ref.current.getAvailableDevices();
	    
        for (const [key, value] of Object.entries(devices)) {
	     if ( key == 'videoInput') {
                 value.forEach( (vid) =>   {
			videoInputs.push( vid.label ); 
		 });

	     }
            }
        // log for debug
        updateLog(items => [ ...items, JSON.stringify(videoInputs) ])

        let nextDevice = "";
        let devs =  await ref.current.getCurrentDevices();

        for (const [key, value] of Object.entries(devs)) {
	             if ( key == 'videoInput') {
                        updateLog(items => [ ...items, "found " + JSON.stringify(value) ])
                        let devLabel = value.label;
			let idx = 0;
                        videoInputs.forEach( (vid) =>   {
                            if (devLabel == vid) {
				  let cur = idx + 1;
				  if (cur >= videoInputs.length) {
			             nextDevice = videoInputs[0];
			          } else  {
                                    nextDevice = videoInputs[cur];
            updateLog(items => [ ...items, "next is " + nextDevice ])
		                  }

			    }
			    idx++;
			});


		     }


                  }
            updateLog(items => [ ...items, "switching to " +  nextDevice ])
          await  ref.current.setVideoInputDevice(nextDevice);
    };

    const handleApiReady = async (apiObj, ref) => {
        ref.current = apiObj;
        await ref.current.addEventListeners({
            // Listening to events from the external API
            audioMuteStatusChanged: payload => handleAudioStatusChange(payload, 'audio'),
            videoMuteStatusChanged: payload => handleAudioStatusChange(payload, 'video'),
            raiseHandUpdated: printEventOutput,
            tileViewChanged: printEventOutput,
            chatUpdated: payload => handleChatUpdates(payload, ref),
            knockingParticipant: handleKnockingParticipant
        });

	
	 await    ref.current.executeCommand('toggleFilmStrip');

     }	;
	
    // Multiple instances demo
    const showUsers = async (ref, which)  => {
 
	    const pinfo = await ref.current.getParticipantsInfo();
            updateLog(items => [ ...items, "participantes " +  JSON.stringify(pinfo) ])
	    await ref.current.executeCommand('setTileView', false);
            await ref.current.setLargeVideoParticipant( pinfo[which].participantId);
    };

	const makeTile = (ref) => {

	     ref.current.executeCommand('setTileView', true);
	};
    const renderButtons = () => (
        <div style={{ margin: '15px 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button
                    type='text'
                    title="Click to show devices"
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#ff9b42',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => showDevices(apiRef)}
                >Video Devices</button>
                <button
                    type='text'
                    title="Click to approve/reject knocking participant"
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#0376da',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => { makeTile(apiRef) }}
                >Tile</button>
                <button
                    type='text'
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#a7a7a7',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => showUsers(apiRef,0)}
                >First user</button>
                <button
                    type='text'
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#a7a7a7',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick={() => showUsers(apiRef,1)}
                >Second user</button>
            </div>
        </div>
    );

    const renderLog = () => logItems.map(
        (item, index) => (
            <div style={{
                fontFamily: 'monospace',
                padding: '5px'
            }} key={index}>{item}</div>
        )
    );

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>Loading..</div>
    );


    return (
        <>
            <h1 style={{
                fontFamily: 'sans-serif',
                textAlign: 'center'
            }}></h1>
            <JitsiMeeting
                domain="meet.jit.si"
	        roomName="whataroom987654321"
                spinner={renderSpinner}
                onApiReady={externalApi => handleApiReady(externalApi, apiRef)}
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
				    enabled: false
			    }
			        }}
	        interfaceConfigOverwrite={{
			     DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
			     FILM_STRIP_MAX_HEIGHT: 0,
			     TILE_VIEW_MAX_COLUMNS: 0,
			     VIDEO_QUALITY_LABEL_DISABLED: true
				    }}
	        userInfo={{
			        displayName: 'Sing'
			    }}

            />
            {renderButtons()}
            {renderLog()}
        </>
    );
};


export default Jitsibroadcaster;
