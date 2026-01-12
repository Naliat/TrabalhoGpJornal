import { Clock } from "lucide-react";
import styles from "../Landing.module.css";

type News = {
  id: number;
  image: string;
  title: string;
  description: string;
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

type Props = {
  data: News[];
};

function NewsGrid({ data }: Props) {
  return (
    <div className={styles.grid}>
      {data.map((news) => (
        <div key={news.id} className={styles.card}>
          <img src={news.image} alt={news.title} />

          <div className={styles.cardContent}>
            <div className={styles.tags}>
              {news.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <h4>{news.title}</h4>
            <p className={styles.description}>{news.description}</p>

            <div className={styles.date}>
              <Clock size={13} />
              <span>Até {formatDate(news.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsGrid;