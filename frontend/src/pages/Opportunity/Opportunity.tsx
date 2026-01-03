import { useMemo, useState } from "react";
import { Search, Filter, GraduationCap } from "lucide-react";

import {
  opportunitiesMock,
  type OpportunityType,
} from "../../mocks/opportunity";

import styles from "./OpportunitiesList.module.css";
import OpportunityCard from "./components/OpportunityCard";

const ITEMS_PER_PAGE = 10;

function OpportunitiesList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<OpportunityType | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return opportunitiesMock
      .filter((op) =>
        op.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((op) =>
        typeFilter === "all" ? true : op.tipo === typeFilter
      );
  }, [search, typeFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <GraduationCap size={28} />
        Estágios e Bolsas
      </h1>

      <p className={styles.subtitle}>Oportunidades de estágios, bolsas e programas para estudantes</p>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            placeholder="Pesquisar pelo nome da oportunidade..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.filterBox}>
          <Filter size={18} />
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value as OpportunityType | "all"
              )
            }
          >
            <option value="all">Todas</option>
            <option value="bolsas-remuneradas">Bolsas</option>
            <option value="estagio">Estágio</option>
            <option value="monitoria">Monitoria</option>
            <option value="voluntario">Voluntário</option>
          </select>
        </div>
      </div>

      <div className={styles.list}>
        {paginated.map((op) => (
          <OpportunityCard
            key={op.id}
            opportunity={op}
          />
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

export default OpportunitiesList;
