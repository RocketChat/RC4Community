import Image from "next/legacy/image";
import Link from "next/link";
import Styles from "../styles/Infotiles.module.css";

export default function Infotiles({ data }) {
  return <>
    {data.map((obj) => (
      <div
        key={obj.id}
        className={obj.imageUrl ? Styles.cardWithImage : Styles.card}
      >
        {obj.imageUrl && (
          <Image
            src={obj.imageUrl}
            width={288}
            height={288}
            alt={obj.name}
            objectFit="contain"
          />
        )}
        <div className={Styles.card_content}>
          <h5 className={Styles.card_heading}>{obj.name}</h5>
          {obj.bio && <p className="fs-light">{obj.bio}</p>}
          <p className={Styles.card_body}>{obj.content}</p>
          {obj.live && <Link href={obj.confHref} passHref legacyBehavior><button className={Styles.actionBtn}>Live</button></Link>}
        </div>
      </div>
    ))}
  </>;
}
