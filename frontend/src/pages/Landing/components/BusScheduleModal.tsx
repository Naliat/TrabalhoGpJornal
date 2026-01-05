import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { busScheduleMock } from "../../../mocks/busSchedule";
import styles from "../Landing.module.css";

const ITEMS_PER_PAGE = 5;

interface Props {
  onClose: () => void;
}

const locationFilters = ["todas", "Rodoviaria", "Campus"] as const;

function BusScheduleModal({ onClose }: Props) {
  const [page, setPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState<
    "todas" | "Rodoviaria" | "Campus"
  >("todas");

  const filteredData = useMemo(() => {
    return busScheduleMock.filter((item) =>
      locationFilter === "todas"
        ? true
        : item.local_saida === locationFilter
    );
  }, [locationFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Horários de Ônibus</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalFilters}>
          {locationFilters.map((filter) => (
            <button
              key={filter}
              className={
                locationFilter === filter ? styles.active : ""
              }
              onClick={() => {
                setPage(1);
                setLocationFilter(filter);
              }}
            >
              {filter === "todas"
                ? "Todos"
                : filter === "Rodoviaria"
                ? "Rodoviária"
                : "Campus"}
            </button>
          ))}
        </div>

        <div className={styles.modalList}>
          {paginatedData.map((item) => (
            <div key={item.id} className={styles.modalRow}>
              <span>
                {item.local_saida === "Rodoviaria"
                  ? "Rodoviária"
                  : "Campus"}
              </span>
              <strong>{item.horario_saida}</strong>
              <span>Ônibus {item.onibus}</span>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.modalPagination}>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusScheduleModal;
