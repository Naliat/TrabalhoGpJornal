import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Wallet,
  User,
  Clock,
  MapPin,
  Info,
  CheckCircle,
  Gift
} from "lucide-react";

import styles from "./OpportunityDetails.module.css";
import { opportunitiesMock } from "../../../../mocks/opportunity";

function OpportunityDetails() {
  const { id } = useParams();

  const opportunity = opportunitiesMock.find(
    (op) => op.id === Number(id)
  );

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

        <h1 className={styles.title}>{opportunity.title}</h1>

        <p className={styles.headerDescription}>
          {opportunity.descricao}
        </p>
      </header>

      <div className={styles.mainGrid}>
        <section className={styles.leftColumn}>
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className={styles.image}
          />

          <div className={styles.contentBox}>
            <h3>Sobre a oportunidade</h3>
            <p>{opportunity.sobre}</p>

            <h3>Requisitos</h3>
            <ul className={styles.iconList}>
              {opportunity.requisitos.map((req, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  {req}
                </li>
              ))}
            </ul>

            <h3>Benefícios</h3>
            <ul className={styles.iconList}>
              {opportunity.beneficios.map((benef, index) => (
                <li key={index}>
                  <Gift size={16} />
                  {benef}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.applyBox}>
            <h3>Como se Candidatar</h3>
            <p>
              Para se candidatar a esta oportunidade,
              clique no botão abaixo para ser
              direcionado ao site oficial de
              inscrições. Certifique-se de ter todos
              os documentos necessários e preencha o
              formulário com atenção.
            </p>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyButton}
            >
              Candidatar-se no Site Oficial
            </a>
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
                  <strong>Prazo de inscrição</strong>
                  <span>
                    {new Date(
                      opportunity.prazoInscricao
                    ).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </li>

              <li>
                <MapPin size={16} />
                <div>
                  <strong>Departamento</strong>
                  <span>{opportunity.departamento}</span>
                </div>
              </li>

              <li>
                <User size={16} />
                <div>
                  <strong>Responsável</strong>
                  <span>{opportunity.professorResponsavel}</span>
                </div>
              </li>

              <li>
                <Clock size={16} />
                <div>
                  <strong>Carga horária</strong>
                  <span>
                    {opportunity.cargaHorariaSemanal}h semanais
                  </span>
                </div>
              </li>

              <li>
                <Clock size={16} />
                <div>
                  <strong>Duração</strong>
                  <span>{opportunity.duracao}</span>
                </div>
              </li>

              <li>
                <Wallet size={16} />
                <div>
                  <strong>Remuneração</strong>
                  <span>
                    {opportunity.valor > 0
                      ? `R$ ${opportunity.valor.toFixed(2)}`
                      : "Voluntário"}
                  </span>
                </div>
              </li>
            </ul>

            <button className={styles.primaryButton}>
              Candidatar-se
            </button>
          </div>

          <div className={styles.alertBox}>
            <strong>Atenção ao Prazo!</strong>
            <p>
              As inscrições encerram em{" "}
              {new Date(
                opportunity.prazoInscricao
              ).toLocaleDateString("pt-BR")}
              . Não perca essa oportunidade!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OpportunityDetails;
