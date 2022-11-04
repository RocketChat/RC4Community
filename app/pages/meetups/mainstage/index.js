import Head from 'next/head';
import { Stack } from 'react-bootstrap';
import { MeetupMainstage } from '../../../components/meetups/mainstage/Mainstage';

const MeetupMainstagePage = () => {
  return (
    <div>
      <Head>
        <title>Virtual Community Meetups Main Stage</title>
        <meta
          name='description'
          content='Demonstration main stage for virtual community meetups'
        />
      </Head>
      <div>
        <Stack direction='vertical'>
          <MeetupMainstage />
        </Stack>
      </div>
    </div>
  );
};

export default MeetupMainstagePage;
