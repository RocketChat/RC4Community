import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from '../../../styles/meetup.module.css';
import dynamic from 'next/dynamic';
import useWindowSize from '../../hooks/useWindowSize';
import { ChatToolBar } from './Toolbar';
import { YoutubeVideoComponent } from './VideoEmbedComponent';

const RCComponent = dynamic(() => import('rc-component-react').then((mod) => mod.RCComponent), {
  ssr: false,
});

export const MeetupMainstage = ({ youtubeVideoId, videoTitle, rcChatChannelName }) => {
  const { width } = useWindowSize()

  const [open, setOpen] = useState();
  useEffect(() => {
    if (width < 790 && open === undefined) {
      setOpen(true)
    }
  }, [width, open])

  return (
    <div className={styles.mainstage_root}>
      <YoutubeVideoComponent
        videoId={youtubeVideoId}
        videoTitle={videoTitle}
      />
      <Collapse in={open}>
        <div className={styles.mainstage_chatwindow}>
          <RCComponent
            moreOpts={true}
            isClosable={true}
            setClosableState={setOpen}
            width={width < 790 ? '100%' : 'auto'}
            height={width < 790 ? '30vh' : '80vh'}
            GOOGLE_CLIENT_ID={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            host={process.env.NEXT_PUBLIC_RC_URL}
            roomId={
              process.env.NEXT_PUBLIC_RC_ROOM_ID ? process.env.NEXT_PUBLIC_RC_ROOM_ID : 'GENERAL'
            }
            channelName={rcChatChannelName}
            anonymousMode={true}
            isFullScreenFromStart={false}
          />
        </div>
      </Collapse>
      <div className={styles.mainstage_chattool}>
        <ChatToolBar
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
};
