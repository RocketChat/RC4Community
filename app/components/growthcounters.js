import styles from '../styles/Growthcounters.module.css';
import Countup from './clientsideonly/countup';
import content from '../data/growthcountersData';
export default function Growthcounters() {


  return (
    <>
      <div className=' d-flex flex-row align-items-center justify-content-center '>
        {
          content.map((comp)=>{
            return (
        <div className={comp.class}>
          <span suppressHydrationWarning={true}>
            {process.browser && (
              <Countup end={comp.end} className={` ${styles.countup}`} />
            )}
          </span>

          <span className={` ${styles.text}`}>{comp.title}</span>
        </div>
            )
          })
        }
      </div>
    </>
  );
}
