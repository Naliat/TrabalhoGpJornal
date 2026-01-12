import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import styles from "./BusSchedule.module.css";
import { busScheduleMock } from "../../mocks/busSchedule";

const ITEMS_PER_PAGE = 10;

const saidaTags = ["todas", "Rodoviaria", "Campus"];
const onibusTags = ["todas", "A", "B"];

function BusSchedule() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [saidaFilter, setSaidaFilter] = useState("todas");
  const [onibusFilter, setOnibusFilter] = useState("todas");

  const filteredData = useMemo(() => {
    return busScheduleMock.filter((item) => {
      const matchSaida =
        saidaFilter === "todas" || item.local_saida === saidaFilter;

      const matchOnibus =
        onibusFilter === "todas" || item.onibus === onibusFilter;

      return matchSaida && matchOnibus;
    });
  }, [saidaFilter, onibusFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.backHome}>
        <Link to="/">
          <ArrowLeft size={14} />
          Voltar para Home
        </Link>
      </div>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Horários dos Ônibus</h1>
          <p className={styles.subtitle}>
            Consulte e gerencie os horários disponíveis
          </p>
        </div>

        <button
          className={styles.createButton}
          onClick={() => navigate("/onibus/novo")}
        >
          <Plus size={16} />
          Criar novo
        </button>
      </div>

      <div className={styles.filtersBlock}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Local de saída</span>

          <div className={styles.filters}>
            {saidaTags.map((tag) => (
              <button
                key={tag}
                className={saidaFilter === tag ? styles.active : ""}
                onClick={() => {
                  setPage(1);
                  setSaidaFilter(tag);
                }}
              >
                {tag === "todas" ? "Todos os locais" : tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Tipo de ônibus</span>

          <div className={styles.filters}>
            {onibusTags.map((tag) => (
              <button
                key={tag}
                className={onibusFilter === tag ? styles.active : ""}
                onClick={() => {
                  setPage(1);
                  setOnibusFilter(tag);
                }}
              >
                {tag === "todas" ? "Todos os ônibus" : `Ônibus ${tag}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {paginatedData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardMain}>
              <span className={styles.cardTitle}>{item.local_saida}</span>
              <span className={styles.time}>{item.horario_saida}</span>
              <span className={styles.typeTag}>Ônibus {item.onibus}</span>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => navigate(`/onibus/editar/${item.id}`)}
              >
                <Pencil size={14} />
                Editar
              </button>

              <button className={styles.deleteButton}>
                <Trash2 size={14} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>

          <span>
            Página {page} de {totalPages}
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
  );
}

export default BusSchedule;
