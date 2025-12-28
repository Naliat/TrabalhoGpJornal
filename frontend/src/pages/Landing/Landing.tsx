import { useState } from "react";
import { newsMock } from "../../mocks/newsMock";


import MenuCard from "./components/MenuCard";
import BusCard from "./components/BusCard";
import NewsGrid from "./components/NewsGrid";

import styles from "./Landing.module.css";
import NewsCard from "./components/NewsCard";

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

function Landing() {
  const [opportunityFilter, setOpportunityFilter] = useState("todas");
  const [academicFilter, setAcademicFilter] = useState("todas");

  const featured = newsMock[0];

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
        <NewsCard {...featured} />
        <BusCard />
        <MenuCard />
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

        <NewsGrid data={opportunities} />
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

        <NewsGrid data={academics} />
      </section>
    </div>
  );
}

export default Landing;
