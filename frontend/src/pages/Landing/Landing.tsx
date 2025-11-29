import { newsMock } from "../../mocks/newsMock";
import styles from "./Landing.module.css";

function Landing() {
    const featured = newsMock.slice(0, 3);
    const others = newsMock.slice(3);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Últimas Notícias</h1>

            {/* QUADRADO DAS 3 NOTÍCIAS */}
            <section className={styles.featuredSection}>
                
                {/* Notícia Principal */}
                <div className={styles.featuredMain}>
                    <img src={featured[0].image} alt={featured[0].title} />
                    <div className={styles.textBlock}>
                        <h2>{featured[0].title}</h2>
                        <p>{featured[0].description}</p>
                        <span>{featured[0].date}</span>
                    </div>
                </div>

                {/* Notícia 2 e 3 empilhadas */}
                <div className={styles.featuredSide}>
                    {featured.slice(1).map((news) => (
                        <div key={news.id} className={styles.featuredSmall}>
                            <img src={news.image} alt={news.title} />
                            <div className={styles.textBlock}>
                                <h3>{news.title}</h3>
                                <p>{news.description}</p>
                                <span>{news.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OUTRAS NOTÍCIAS */}
            <section className={styles.otherNews}>
                <h2 className={styles.sectionTitle}>Outras Notícias</h2>
                {others.map((news) => (
                    <div key={news.id} className={styles.otherItem}>
                        <img src={news.image} alt={news.title} />
                        <div>
                            <h4>{news.title}</h4>
                            <p>{news.description}</p>
                            <span>{news.date}</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Landing;
