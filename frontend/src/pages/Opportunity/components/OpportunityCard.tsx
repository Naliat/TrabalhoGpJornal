import { Calendar, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Opportunity } from "../../../mocks/opportunity";
import styles from "../OpportunitiesList.module.css";

const typeLabelMap = {
  "bolsas-remuneradas": "Bolsa",
  estagio: "Estágio",
  monitoria: "Monitoria",
  voluntario: "Voluntário",
};

interface Props {
  opportunity: Opportunity;
}

function OpportunityCard({ opportunity }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/oportunidades/${opportunity.id}`)}
    >
      <strong className={styles.cardTitle}>{opportunity.title}</strong>

      <p className={styles.description}>
        {opportunity.descricao}
      </p>

      <div className={styles.tags}>
        <span className={styles.typeTag}>
          {typeLabelMap[opportunity.tipo]}
        </span>

        {opportunity.valor > 0 && (
          <span className={styles.valueTag}>
            <Wallet size={14} />
            R$ {opportunity.valor.toFixed(2)}
          </span>
        )}

        <span className={styles.deadlineTag}>
          <Calendar size={14} />
          Inscrição até{" "}
          {new Date(opportunity.prazoInscricao).toLocaleDateString(
            "pt-BR"
          )}
        </span>
      </div>
    </div>
  );
}

export default OpportunityCard;
