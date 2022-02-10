import Styles from "../styles/Infotiles.module.css";
import infotiles from "../data/infotilesData";
export default function Infotiles() {
  return (
    <>
      <div className={Styles.cards}>
        {infotiles.map((info) => {
          return (
            <div className={Styles.card}>
              <h5 className={Styles.card_heading}>{info.title}</h5>
              <p className={Styles.card_body}>{info.body}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
