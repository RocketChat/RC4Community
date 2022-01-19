import styles from '../styles/Growthcounters.module.css';
import Countup from './clientsideonly/countup';

export default function Growthcounters() {
  return (
    <>
      <div className=' d-flex flex-row align-items-center justify-content-center '>
        <div className='d-flex flex-column  pe-4 px-md-5 mx-md-3'>
          <span suppressHydrationWarning={true}>
            {process.browser && (
              <Countup end={343433} className={` ${styles.countup}`} />
            )}
          </span>

          <span className={` ${styles.text}`}>Users</span>
        </div>

        <div className='d-flex flex-column  px-4 px-md-5 mx-md-3 border-start border-gray'>
          <span suppressHydrationWarning={true}>
            {process.browser && (
              <Countup end={1294056} className={` ${styles.countup}`} />
            )}
          </span>
          <span className={` ${styles.text}`}>Messages</span>
        </div>

        <div className='d-flex flex-column  ps-4 px-md-5 mx-md-3 border-start border-gray'>
          <span suppressHydrationWarning={true}>
            {process.browser && (
              <Countup end={507} className={` ${styles.countup}`} />
            )}
          </span>
          <span className={` ${styles.text}`}>Online</span>
        </div>
      </div>
    </>
  );
}
