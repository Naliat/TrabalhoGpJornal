import { useParams } from "react-router-dom";
import { Calendar, Wallet, User, Clock } from "lucide-react";

import styles from "./OpportunityDetails.module.css";
import { opportunitiesMock } from "../../../../mocks/opportunity";

function OpportunityDetails() {
  const { id } = useParams();

  const opportunity = opportunitiesMock.find(
    (op) => op.id === Number(id)
  );

  if (!opportunity) {
    return <p className={styles.notFound}>Oportunidade não encontrada.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{opportunity.title}</h1>

      <p className={styles.description}>{opportunity.descricao}</p>

      <div className={styles.infoGrid}>
        <div>
          <Calendar size={18} />
          Prazo:{" "}
          {new Date(opportunity.prazoInscricao).toLocaleDateString(
            "pt-BR"
          )}
        </div>

        {opportunity.valor > 0 && (
          <div>
            <Wallet size={18} />
            Valor: R$ {opportunity.valor.toFixed(2)}
          </div>
        )}

        <div>
          <User size={18} />
          Professor responsável: {opportunity.professorResponsavel}
        </div>

        <div>
          <Clock size={18} />
          Carga horária: {opportunity.cargaHorariaSemanal}h/semana
        </div>
      </div>
    </div>
  );
}

export default OpportunityDetails;
