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
  try {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Data indisponível";
  }
}

function NewsCard({
  image,
  title,
  description,
  date,
  tags,
}: Props) {
  
  const fallbackImage = "https://images.unsplash.com/photo-1585829365234-781fcd04c838?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className={styles.featuredMain}>
       
      <img 
        src={image || fallbackImage} 
        alt={title} 
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
      />

      <div className={styles.textBlock}>
        <div className={styles.tags}>
          {tags && tags.length > 0 ? (
            tags.map((tag) => (
              <span key={tag} className={styles.tagBadge}>{tag}</span>
            ))
          ) : (
            <span className={styles.tagBadge}>Geral</span>
          )}
        </div>

        <h2 className={styles.featuredTitle}>{title}</h2>
        <p className={styles.featuredDescription}>{description}</p>

        <div className={styles.date}>
          <Clock size={14} />
           
          <span>Publicado em {formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;