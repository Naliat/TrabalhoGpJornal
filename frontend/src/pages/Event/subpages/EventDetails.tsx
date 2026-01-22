import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Info,
  CheckCircle,
} from "lucide-react";

import styles from "./EventDetails.module.css";
import type { NoticiaResponseDTO } from "../../NewsRegister/types/NoticiaResponseDTO";
import { getNoticiaById } from "../../../api/service/news/getNoticiaById";

/**
 * Corrige datas vindas da API no formato:
 * 2026-01-11T13:02:03.762000
 */
function parseApiDate(dateString?: string): Date | null {
  if (!dateString) return null;
  return new Date(dateString.replace(/\.\d{6}/, ""));
}

function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<NoticiaResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticia() {
      if (!id) return;

      try {
        const data = await getNoticiaById(id);
        setEvent(data);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticia();
  }, [id]);

  if (loading) {
    return <p className={styles.notFound}>Carregando...</p>;
  }

  if (!event) {
    return <p className={styles.notFound}>Evento não encontrado.</p>;
  }

  const publishedDate = parseApiDate(
    // fallback defensivo
    (event as any).data_publicacao ?? event.data_publicacao
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/eventos" className={styles.backLink}>
          ← Voltar para eventos
        </Link>

        <h1 className={styles.title}>{event.titulo}</h1>

        <p className={styles.headerDescription}>
          {event.conteudo}
        </p>
      </header>

      <div className={styles.mainGrid}>
        {/* COLUNA ESQUERDA */}
        <section className={styles.leftColumn}>
          {event.imagem_url && (
            <img
              src={event.imagem_url}
              alt={event.titulo}
              className={styles.image}
            />
          )}

          <div className={styles.contentBox}>
            <h3>Sobre o evento</h3>
            <p>{event.conteudo}</p>

            <h3>Tags</h3>
            <ul className={styles.iconList}>
              {event.tags.map((tag, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.applyBox}>
            <h3>Mais informações</h3>
            <p>
              Este evento foi publicado na plataforma.
              Para mais detalhes, acompanhe as atualizações.
            </p>
          </div>
        </section>

        {/* COLUNA DIREITA */}
        <aside className={styles.rightColumn}>
          <div className={styles.sideBox}>
            <h3>
              <Info size={18} />
              Informações
            </h3>

            <ul className={styles.infoList}>
              <li>
                <Calendar size={16} />
                <div>
                  <strong>Data de publicação</strong>
                  <span>
                    {publishedDate
                      ? publishedDate.toLocaleDateString("pt-BR")
                      : "Data não informada"}
                  </span>
                </div>
              </li>

              <li>
                <Clock size={16} />
                <div>
                  <strong>Horário</strong>
                  <span>
                    {publishedDate
                      ? publishedDate.toLocaleTimeString("pt-BR")
                      : "—"}
                  </span>
                </div>
              </li>
            </ul>

            <button className={styles.primaryButton}>
              Acompanhar
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventDetails;
