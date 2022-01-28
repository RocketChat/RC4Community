import styles from "../styles/BrandLogo.module.css";

export default function BrandLogo(props) {
  return (
    <>
      <a href={props.brandLink} className={styles.brand}>
        <img
          src={props.logoLink}
          title={props.imageTitle}
          alt={props.brandName}
          height={props.height}
          width={props.width}
        />
      </a>
    </>
  );
}