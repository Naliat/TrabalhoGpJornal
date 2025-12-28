import { useState } from "react";
import { Clock } from "lucide-react";
import { newsMock } from "../../mocks/newsMock";
import styles from "./Landing.module.css";
import Footer from "../../components/Footer/Footer";

const opportunityTags = [
  "todas",
  "bolsas-remuneradas",
  "estagio",
  "monitoria",
  "voluntario",
];

const academicTags = [
  "todas",
  "pesquisa",
  "extensao",
  "eventos",
  "empreendedorismo",
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Landing() {
  const [opportunityFilter, setOpportunityFilter] = useState("todas");
  const [academicFilter, setAcademicFilter] = useState("todas");

  const featured = newsMock.slice(0, 3);

  const opportunities = newsMock
    .filter((n) =>
      opportunityFilter === "todas"
        ? n.tags.some((t) =>
            ["bolsas-remuneradas", "estagio", "monitoria", "voluntario"].includes(t)
          )
        : n.tags.includes(opportunityFilter)
    )
    .slice(0, 6);

  const academics = newsMock
    .filter((n) =>
      academicFilter === "todas"
        ? n.tags.some((t) =>
            ["pesquisa", "extensao", "eventos", "empreendedorismo"].includes(t)
          )
        : n.tags.includes(academicFilter)
    )
    .slice(0, 6);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informações Relevantes</h1>

      <section className={styles.featuredSection}>
        <div className={styles.featuredMain}>
          <img src={featured[0].image} alt={featured[0].title} />

          <div className={styles.textBlock}>
            <div className={styles.tags}>
              {featured[0].tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <h2 className={styles.featuredTitle}>{featured[0].title}</h2>

            <p className={styles.featuredDescription}>
              {featured[0].description}
            </p>

            <div className={styles.date}>
              <Clock size={14} />
              <span>Até {formatDate(featured[0].date)}</span>
            </div>
          </div>
        </div>

        <div className={styles.featuredSide}>
          {featured.slice(1).map((news) => (
            <div key={news.id} className={styles.featuredSmall}>
              <img src={news.image} alt={news.title} />

              <div className={styles.textBlock}>
                <div className={styles.tags}>
                  {news.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <h3>{news.title}</h3>

                <p className={styles.description}>{news.description}</p>

                <div className={styles.date}>
                  <Clock size={13} />
                  <span>Até {formatDate(news.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>
          Últimas Oportunidades (Bolsas e Estágio)
        </h2>

        <div className={styles.filters}>
          {opportunityTags.map((tag) => (
            <button
              key={tag}
              className={opportunityFilter === tag ? styles.active : ""}
              onClick={() => setOpportunityFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {opportunities.map((news) => (
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
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>
          Pesquisa, Extensão e Comunidade
        </h2>

        <div className={styles.filters}>
          {academicTags.map((tag) => (
            <button
              key={tag}
              className={academicFilter === tag ? styles.active : ""}
              onClick={() => setAcademicFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {academics.map((news) => (
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
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
