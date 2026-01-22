import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Info,
  CheckCircle,
} from "lucide-react";

import styles from "./OpportunityDetails.module.css";
import type { NoticiaResponseDTO } from "../../../NewsRegister/types/NoticiaResponseDTO";
import { getNoticiaById } from "../../../../api/service/news/getNoticiaById";

function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();

  const [opportunity, setOpportunity] = useState<NoticiaResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticia() {
      if (!id) return;

      try {
        const data = await getNoticiaById(id);
        setOpportunity(data);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticia();
  }, [id]);

  if (loading) {
    return (
      <p className={styles.notFound}>
        Carregando...
      </p>
    );
  }

  if (!opportunity) {
    return (
      <p className={styles.notFound}>
        Oportunidade não encontrada.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/oportunidades" className={styles.backLink}>
          ← Voltar para oportunidades
        </Link>

        <h1 className={styles.title}>{opportunity.titulo}</h1>

        <p className={styles.headerDescription}>
          {opportunity.conteudo}
        </p>
      </header>

      <div className={styles.mainGrid}>
        <section className={styles.leftColumn}>
          {opportunity.imagem_url && (
            <img
              src={opportunity.imagem_url}
              alt={opportunity.titulo}
              className={styles.image}
            />
          )}

          <div className={styles.contentBox}>
            <h3>Sobre a oportunidade</h3>
            <p>{opportunity.conteudo}</p>

            <h3>Tags</h3>
            <ul className={styles.iconList}>
              {opportunity.tags.map((tag, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.applyBox}>
            <h3>Mais informações</h3>
            <p>
              Esta oportunidade foi publicada na plataforma.
              Para mais detalhes, acompanhe as atualizações.
            </p>
          </div>
        </section>

        <aside className={styles.rightColumn}>
          <div className={styles.infoWrapper}>
            <h3 className={styles.sectionTitle}>
              <Info size={18} />
              Informações
            </h3>

            <ul className={styles.infoList}>
              <li>
                <Calendar size={16} />
                <div>
                  <strong>Data de publicação</strong>
                  <span>
                    {new Date(opportunity.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </li>

              <li>
                <Clock size={16} />
                <div>
                  <strong>Horário</strong>
                  <span>
                    {new Date(opportunity.created_at).toLocaleTimeString("pt-BR")}
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

export default OpportunityDetails;
