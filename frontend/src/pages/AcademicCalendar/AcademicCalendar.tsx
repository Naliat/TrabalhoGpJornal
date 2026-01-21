import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

import CalendarEventCard from "./components/CalendarEventCard";
import styles from "./AcademicCalendar.module.css";
import { calendarMock, type CalendarEventType } from "../../mocks/calendarMock";

const filters: { label: string; value: CalendarEventType | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Acadêmico", value: "academico" },
  { label: "Administrativo", value: "administrativo" },
  { label: "Férias", value: "ferias" },
  { label: "Feriado", value: "feriado" },
];

function AcademicCalendar() {
  const [filter, setFilter] = useState<CalendarEventType | "all">("all");

  const grouped = useMemo(() => {
    const filtered =
      filter === "all"
        ? calendarMock
        : calendarMock.filter((e) => e.tipo === filter);

    return filtered.reduce<Record<string, typeof calendarMock>>(
      (acc, event) => {
        acc[event.mes] = acc[event.mes] || [];
        acc[event.mes].push(event);
        return acc;
      },
      {}
    );
  }, [filter]);

  return (
    <div className={styles.container}>
      <p className={styles.backHome}>
        <Link to="/">← Voltar para a página inicial</Link>
      </p>

      <h1 className={styles.title}>
        <CalendarDays size={28} />
        Calendário Acadêmico
      </h1>

      <p className={styles.subtitle}>
        Acompanhe as datas importantes do semestre letivo, prazos de matrícula,
        avaliações e eventos acadêmicos da UFC Quixadá.
      </p>

      {/* FILTROS EM PILLS */}
      <div className={styles.filterPills}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.pill} ${
              filter === f.value ? styles.active : ""
            }`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* AGRUPAMENTO POR MÊS */}
      <div className={styles.timeline}>
        {Object.entries(grouped).map(([month, events]) => (
          <div key={month} className={styles.monthGroup}>
            <span className={styles.monthBadge}>{month}</span>

            <div className={styles.monthLine} />

            <div className={styles.cards}>
              {events.map((event) => (
                <CalendarEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicCalendar;
