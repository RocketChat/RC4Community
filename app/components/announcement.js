import styles from "../styles/Announcement.module.css";

export default function Announcement(props) {
  if (
    typeof props.announcement === "undefined" ||
    typeof props.announcement.announcement_text === "undefined"
  ) {
    return <></>;
  }
  return (
    <a
      href={props.announcement.redirect_url}
      className={`d-flex flex-column align-items-center p-2 ${styles.announcement} ${styles.announcement_link}`}
    >
      <h6 className={`pt-1`} >{props.announcement.announcement_text}</h6>
    </a>
  );
}
