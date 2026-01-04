import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./EventsList.module.css";
import { eventsMock } from "../../mocks/event";

const eventTags = [
  "todas",
  "Acadêmico",
  "Cultural",
  "Esportivo",
  "Workshops",
  "Palestras",
];

function EventsList() {
  const [filter, setFilter] = useState("todas");
  const navigate = useNavigate();

  const featuredEvent = eventsMock.find((e) => e.ativo);

  const filteredEvents = eventsMock
    .filter((event) =>
      filter === "todas" ? true : event.tag === filter
    )
    .slice(0, 6);

  const eventosAtivos = eventsMock.filter((e) => e.ativo).length;
  const totalVagas = eventsMock.reduce(
    (acc, e) => acc + e.totalVagas,
    0
  );
  const eventosCulturais = eventsMock.filter(
    (e) => e.tag === "Cultural"
  ).length;
  const inscricoesAbertas = eventsMock.filter(
    (e) => e.ativo
  ).length;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Voltar para a página inicial
      </Link>

      <h1 className={styles.title}>Eventos UFC Quixadá</h1>
      <p className={styles.subtitle}>Participe dos eventos acadêmicos, culturais e esportivos do campus. Amplie seus conhecimentos e networking!</p>

      {featuredEvent && (
        <section className={styles.featuredSection}>
          <div className={styles.featuredCard}>
            <img
              src={featuredEvent.image}
              alt={featuredEvent.titulo}
            />

            <div className={styles.featuredContent}>
              <span className={styles.tag}>
                {featuredEvent.tag}
              </span>
              <h2>{featuredEvent.titulo}</h2>
              <p>{featuredEvent.subtitulo}</p>

              <button
                onClick={() =>
                  navigate(`/eventos/${featuredEvent.id}`)
                }
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </section>
      )}

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>
          Todos os Eventos
        </h2>

        <div className={styles.filters}>
          {eventTags.map((tag) => (
            <button
              key={tag}
              className={filter === tag ? styles.active : ""}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.card}>
              <img
                src={event.image}
                alt={event.titulo}
              />

              <div className={styles.cardContent}>
                <span className={styles.tag}>
                  {event.tag}
                </span>
                <h3>{event.titulo}</h3>
                <p className={styles.description}>
                  {event.subtitulo}
                </p>

                <button
                  onClick={() =>
                    navigate(`/eventos/${event.id}`)
                  }
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <strong>{eventosAtivos}</strong>
          <span>Eventos Ativos</span>
        </div>

        <div className={styles.statCard}>
          <strong>{totalVagas}</strong>
          <span>Total de Vagas</span>
        </div>

        <div className={styles.statCard}>
          <strong>{eventosCulturais}</strong>
          <span>Eventos Culturais</span>
        </div>

        <div className={styles.statCard}>
          <strong>{inscricoesAbertas}</strong>
          <span>Inscrições Abertas</span>
        </div>
      </section>
    </div>
  );
}

export default EventsList;
