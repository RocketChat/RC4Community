import Image from "next/image";
import Styles from "../styles/Infotiles.module.css";

export default function Infotiles({ data }) {
  return (
    <>
      {data.map((obj) => (
        <div
          key={obj.id}
          className={obj.imageURL ? Styles.cardWithImage : Styles.card}
        >
          {obj.imageURL && (
            <Image
              className={Styles.image}
              src={obj.imageURL}
              width={271}
              height={174}
            />
          )}
          <div className={Styles.card_content}>
            <h5 className={Styles.card_heading}>{obj.name}</h5>
            <p className={Styles.card_body}>{obj.content}</p>
            {obj.actionBtn && (
              <button className={Styles.actionBtn}>{obj.actionBtn}</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
