import { useMemo, useState, useEffect } from "react";
import { Search, Filter, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import { getNews } from "../../api/service/news/getNews";
import OpportunityCard from "./components/OpportunityCard";
import styles from "./OpportunitiesList.module.css";

const ITEMS_PER_PAGE = 15;
function OpportunitiesList() {
  
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

   
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
         
        const data = await getNews("Oportunidade");
        setOpportunities(data);
      } catch (err) {
        console.error("Erro ao carregar oportunidades do banco:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  
  const filtered = useMemo(() => {
    return opportunities
      .filter((op) =>
         
        op.titulo.toLowerCase().includes(search.toLowerCase())
      )
      .filter((op) =>
        
        typeFilter === "all" ? true : op.tags?.includes(typeFilter)
      );
  }, [search, typeFilter, opportunities]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Conectando ao banco de dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.backHome}>
        <Link to="/">← Voltar para a página inicial</Link>
      </p>

      <h1 className={styles.title}>
        <GraduationCap size={28} />
        Estágios e Bolsas
      </h1>

      <p className={styles.subtitle}>
        Oportunidades de estágios, bolsas e programas para estudantes
      </p>

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
            onChange={(e) => setTypeFilter(e.target.value)}
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
        {paginated.length > 0 ? (
          paginated.map((op) => (
            <OpportunityCard
              key={op.id}
              
              opportunity={{
                id: op.id,
                title: op.titulo,
                description: op.conteudo,
                tipo: op.tags?.[0] || "Oportunidade",
                tags: op.tags || [],
                data: op.data_publicacao
              } as any}
            />
          ))
        ) : (
          <p className={styles.empty}>Nenhuma vaga encontrada para os critérios selecionados.</p>
        )}
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