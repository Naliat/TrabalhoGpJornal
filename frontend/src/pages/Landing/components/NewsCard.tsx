import { Clock } from "lucide-react";
import styles from "../Landing.module.css";

type Props = {
  image: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  tags: string[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({
  image,
  title,
  description,
  date,
  tags,
}: Props) {
  return (
    <div className={styles.featuredMain}>
      <img src={image} alt={title} />

      <div className={styles.textBlock}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <h2 className={styles.featuredTitle}>{title}</h2>
        <p className={styles.featuredDescription}>{description}</p>

        <div className={styles.date}>
          <Clock size={14} />
          <span>Até {formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;