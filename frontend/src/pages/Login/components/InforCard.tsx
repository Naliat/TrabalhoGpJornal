import type { InfoCardProps } from "../types/InfoCardProps";
import styles from "../Login.module.css";

function InfoCard({ image, text, alt }: InfoCardProps) {
  return (
    <article className={styles.infoCard}>
      <img src={image} alt={alt} />
      <p>{text}</p>
    </article>
  );
}

export default InfoCard;
