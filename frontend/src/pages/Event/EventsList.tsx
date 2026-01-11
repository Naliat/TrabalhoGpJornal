import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNews } from "../../api/service/news/getNews";
import styles from "./EventsList.module.css";

const eventTags = [
  "todas",
  "Acadêmico",
  "Cultural",
  "Esportivo",
  "Workshops",
  "Palestras",
];

function EventsList() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const data = await getNews("Evento");
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const featuredEvent = events[0];

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) =>
        filter === "todas" ? true : event.tags?.includes(filter)
      )
      .slice(0, 6);
  }, [events, filter]);

  const eventosAtivos = events.length;
  const eventosCulturais = events.filter((e) => e.tags?.includes("Cultural")).length;
  const totalVagas = events.length * 50; 

  if (loading) return <div className={styles.container}><p>Carregando...</p></div>;

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
              src={featuredEvent.imagem_url || "https://via.placeholder.com/800x400"}
              alt={featuredEvent.titulo}
            />

            <div className={styles.featuredContent}>
              <span className={styles.tag}>
                {featuredEvent.tags?.[0] || "Geral"}
              </span>
              <h2>{featuredEvent.titulo}</h2>
              <p>{featuredEvent.conteudo.substring(0, 150)}...</p>

              <button onClick={() => navigate(`/eventos/${featuredEvent.id}`)}>
                Ver detalhes
              </button>
            </div>
          </div>
        </section>
      )}

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>Todos os Eventos</h2>

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
                src={event.imagem_url || "https://via.placeholder.com/400x200"}
                alt={event.titulo}
              />

              <div className={styles.cardContent}>
                <span className={styles.tag}>
                  {event.tags?.[0] || "Evento"}
                </span>
                <h3>{event.titulo}</h3>
                <p className={styles.description}>
                  {event.conteudo.substring(0, 100)}...
                </p>

                <button onClick={() => navigate(`/eventos/${event.id}`)}>
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
          <span>Vagas Estimadas</span>
        </div>
        <div className={styles.statCard}>
          <strong>{eventosCulturais}</strong>
          <span>Culturais</span>
        </div>
        <div className={styles.statCard}>
          <strong>{eventosAtivos}</strong>
          <span>Inscrições Abertas</span>
        </div>
      </section>
    </div>
  );
}

export default EventsList;