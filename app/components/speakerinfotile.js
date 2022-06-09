import Image from "next/image";
import Styles from "../styles/SpeakerInfotiles.module.css";
import { parseDate, parseTime } from "../lib/dateTime";

export default function SpeakerInfotiles({ data }) {
  return (
    <>
      {data?.map((obj) => (
        <div
          key={obj.id}
          className={obj.attributes.imageUrl ? Styles.cardWithImage : Styles.card}
        >
          {obj.attributes.imageUrl && (
            <Image
              src={obj.attributes.imageUrl}
              width={271}
              height={174}
              objectFit="cover"
            />
          )}
          <div className={Styles.card_content}>
            <h5 className={Styles.card_heading}>{obj.attributes.name}</h5>
            {obj.attributes.date_time && (
              <p className={Styles.talk_timing}>{`${parseDate(
                obj.attributes.date_time
              )} ${parseTime(obj.attributes.date_time)}`}</p>
            )}
            <h6
              className={obj.attributes.live ? Styles.talk_topic_live : Styles.talk_topic}
            >
              {obj.attributes.talk_topic}
            </h6>
            <p className={Styles.speaker_bio}>{obj.attributes.short_bio}</p>
          </div>
        </div>
      ))}
    </>
  );
}
