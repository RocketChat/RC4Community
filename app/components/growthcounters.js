import styles from "../styles/Growthcounters.module.css"
import Countup from "./clientsideonly/countup"
import { FaGlobe, FaComments, FaUsers } from "react-icons/fa"
export default function Growthcounters() {
    return (
        <>
            <span>
                <FaUsers className={styles.icon} />
                &nbsp;
                <span suppressHydrationWarning={true}>
                    {process.browser && <Countup end={343433} className="no" />}
                </span>
                &nbsp;
                Users
                &nbsp;&nbsp;&nbsp;
                <FaComments className={styles.icon} />
                &nbsp;
                <span suppressHydrationWarning={true}>
                    {process.browser && <Countup end={12940830} className="no" />}
                </span>
                &nbsp;
                Messsages
                &nbsp;&nbsp;&nbsp;
                <FaGlobe className={styles.icon} />
                &nbsp;
                <span suppressHydrationWarning={true}>
                    {process.browser && <Countup end={507} className="no" />}
                </span>
                &nbsp;
                Online
            </span>
        </>
    )
}