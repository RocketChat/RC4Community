import Styles from "../styles/Infotiles.module.css";
export default function Infotiles({infotiles}) {
  return (
    <>
      <div className={Styles.cards}>
        {infotiles.map((info) => {
          return (
            <div className={Styles.card}>
              <h5 className={Styles.card_heading}>{info.title}</h5>
              <p className={Styles.card_body}>{info.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
