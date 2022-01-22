import Styles from '../styles/Infotiles.module.css';

export default function Infotiles() {
  return (
    <>
      <div className={Styles.cards}>
        <div className={Styles.card}>
          <h5 className={Styles.card_heading}>Documentation</h5>
          <p className={Styles.card_body}>
            Find in-depth information about Rocket.Chat features and API.
          </p>
        </div>
        <div className={Styles.card}>
          <h5 className={Styles.card_heading}>Learn</h5>
          <p className={Styles.card_body}>
            Learn about Rocket.Chat in an interactive course with quizzes!
          </p>
        </div>
        <div className={Styles.card}>
          <h5 className={Styles.card_heading}>Examples</h5>
          <p className={Styles.card_body}>
            Discover and deploy boilerplate example Rocket.Chat projects.
          </p>
        </div>
        <div className={Styles.card}>
          <h5 className={Styles.card_heading}>Deploy</h5>
          <p className={Styles.card_body}>
            Instantly deploy your Rocket.Chat site to a public URL with
            Rocket.Chat SaaS.
          </p>
        </div>
      </div>
    </>
  );
}
