import styles from "../styles/Growthcounters.module.css";
import Countup from "./clientsideonly/countup";
export default function Growthcounters({ counters }) {


  return (
    <>
      <div className=" d-flex flex-row align-items-center justify-content-center ">
        {counters.map((count, index) => {
          return (
            <div
              className={
                "d-flex flex-column  pe-4 px-md-5 mx-md-3 " +
                (index != 0 ? "border-start border-gray" : "")
              }
            >
              <span suppressHydrationWarning={true}>
                {process.browser && (
                  <Countup end={count.count} className={` ${styles.countup}`} />
                )}
              </span>

              <span className={` ${styles.text}`}>{count.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
