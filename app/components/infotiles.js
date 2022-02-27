import Image from "next/image";
import Link from "next/link";
import Styles from "../styles/Infotiles.module.css";

export default function Infotiles({ data }) {
  return (
    <>
      {data.map((obj) => (
        <div
          key={obj.id}
          className={obj.imageUrl ? Styles.cardWithImage : Styles.card}
        >
          {obj.imageUrl && (
            <Image
              src={obj.imageUrl}
              width={271}
              height={174}
              objectFit="cover"
            />
          )}
          <div className={Styles.card_content}>
            <h5 className={Styles.card_heading}>{obj.name}</h5>
            <p className={Styles.card_body}>{obj.content}</p>
            {obj.live && <Link href={obj.confHref}><button className={Styles.actionBtn}>Live</button></Link>}
          </div>
        </div>
      ))}
    </>
  );
}
