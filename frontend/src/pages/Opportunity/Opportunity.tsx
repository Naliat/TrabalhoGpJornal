import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Wallet,
  GraduationCap,
} from "lucide-react";

import {
  opportunitiesMock,
  type OpportunityType,
} from "../../mocks/opportunity";

import styles from "./OpportunitiesList.module.css";

const ITEMS_PER_PAGE = 10;

const typeLabelMap: Record<OpportunityType, string> = {
  "bolsas-remuneradas": "Bolsa",
  estagio: "Estágio",
  monitoria: "Monitoria",
  voluntario: "Voluntário",
};

function OpportunitiesList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<OpportunityType | "all">("all");
  const [page, setPage] = useState(1);

  const filteredOpportunities = useMemo(() => {
    return opportunitiesMock
      .filter((op) =>
        op.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((op) =>
        typeFilter === "all" ? true : op.tipo === typeFilter
      );
  }, [search, typeFilter]);

  const totalPages = Math.ceil(
    filteredOpportunities.length / ITEMS_PER_PAGE
  );

  const paginatedOpportunities = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredOpportunities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOpportunities, page]);

  function handleFilterChange(value: OpportunityType | "all") {
    setTypeFilter(value);
    setPage(1);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <GraduationCap size={28} />
        Oportunidades Acadêmicas
      </h1>

      {/* 🔍 BUSCA E FILTROS */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
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
              handleFilterChange(
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

      {/* 📋 LISTA */}
      <div className={styles.list}>
        {paginatedOpportunities.map((op) => (
          <div key={op.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <strong className={styles.cardTitle}>
                {op.title}
              </strong>

              <p className={styles.description}>
                {op.descricao ??
                  "Oportunidade acadêmica destinada a estudantes interessados em desenvolvimento, pesquisa e participação institucional."}
              </p>

              <div className={styles.tags}>
                <span className={styles.typeTag}>
                  {typeLabelMap[op.tipo]}
                </span>

                {op.valor > 0 && (
                  <span className={styles.valueTag}>
                    <Wallet size={14} />
                    R$ {op.valor.toFixed(2)}
                  </span>
                )}

                <span className={styles.deadlineTag}>
                  <Calendar size={14} />
                  Inscrição até{" "}
                  {new Date(op.prazoInscricao).toLocaleDateString(
                    "pt-BR"
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}

        {paginatedOpportunities.length === 0 && (
          <p className={styles.empty}>
            Nenhuma oportunidade encontrada.
          </p>
        )}
      </div>

      {/* 🔢 PAGINAÇÃO */}
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
