import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from '../../../styles/meetup.module.css';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { ChatToolBar } from './Toolbar';
import { YoutubeVideoComponent } from './VideoEmbedComponent';

const RCComponent = dynamic(() => import('rc-component-react').then((mod) => mod.RCComponent), {
  ssr: false,
});

export const MeetupMainstage = () => {
  const isSmallScreen = useMediaQuery('(max-width: 790px)');
  const [open, setOpen] = useState(isSmallScreen);

  return (
    <div className={styles.mainstage_root}>
      <YoutubeVideoComponent
        videoId={'E7wJTI-1dvQ'}
        videoTitle={'Some Awesome Video'}
      />
      <Collapse in={open}>
        <div className={styles.mainstage_chatwindow}>
          <RCComponent
            moreOpts={true}
            isClosable={true}
            setClosableState={setOpen}
            width={isSmallScreen ? '100%' : 'auto'}
            height={isSmallScreen ? '30vh' : '80vh'}
            GOOGLE_CLIENT_ID={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            host={process.env.NEXT_PUBLIC_RC_URL}
            roomId={
              process.env.NEXT_PUBLIC_RC_ROOM_ID ? process.env.NEXT_PUBLIC_RC_ROOM_ID : 'GENERAL'
            }
            channelName='General'
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
