import Image from "next/image";
import Link from "next/link";
import Styles from "../styles/SpeakerInfotiles.module.css";

export default function SpeakerInfotiles({ data }) {
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
            <p className={Styles.talk_timing}>{obj.date_time}</p>
            <h6 className={Styles.talk_topic}>{obj.talk_topic}</h6>
            <p className={Styles.speaker_bio}>{obj.short_bio}</p>
            {obj.live && <Link href={obj.confHref}><button className={Styles.actionBtn}>Live</button></Link>}
          </div>
        </div>
      ))}
    </>
  );
}
