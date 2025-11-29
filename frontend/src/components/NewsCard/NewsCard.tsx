import styles from "./NewsCard.module.css";

interface NewsCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
  isLarge?: boolean;
}

function NewsCard({ image, title, date, description, isLarge }: NewsCardProps) {
  return (
    <div className={`${styles.card} ${isLarge ? styles.large : ""}`}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{date}</span>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default NewsCard;
