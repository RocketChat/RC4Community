import { Button, ButtonGroup } from 'react-bootstrap';
import { FaRocketchat } from 'react-icons/fa';
import styles from '../../../styles/meetup.module.css';

export const ChatToolBar = ({ setOpen, open }) => {
  return (
    <ButtonGroup size={'sm'}>
      <Button onClick={() => setOpen(!open)}>
        <FaRocketchat />
        <div className={styles.mainstage_button_text}>Chat</div>
      </Button>
    </ButtonGroup>
  );
};
