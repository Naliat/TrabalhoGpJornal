import { Calendar, Clock, MapPin } from "lucide-react";
import styles from "../AcademicCalendar.module.css";

interface Props {
  event: {
    tipo: string;
    inicio: string;
    fim?: string;
    duracao: number;
    titulo: string;
    descricao: string;
    sistema?: string;
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export default function CalendarEventCard({ event }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={`${styles.badge} ${styles[event.tipo]}`}>
          {event.tipo}
        </span>

        <span className={styles.meta}>
          <Calendar size={14} />
          {event.fim
            ? `${formatDate(event.inicio)} - ${formatDate(event.fim)}`
            : formatDate(event.inicio)}
        </span>

        <span className={styles.meta}>
          <Clock size={14} />
          {event.duracao} dia{event.duracao > 1 && "s"}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{event.titulo}</h3>

      <p className={styles.description}>{event.descricao}</p>

      {event.sistema && (
        <span className={styles.system}>
          <MapPin size={14} />
          {event.sistema}
        </span>
      )}
    </div>
  );
}
