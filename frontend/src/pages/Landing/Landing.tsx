import { useState, useEffect } from "react";
import { getNews } from "../../api/service/news/getNews";

import MenuCard from "./components/MenuCard";
import BusCard from "./components/BusCard";
import NewsGrid from "./components/NewsGrid";
import NewsCard from "./components/NewsCard";

import styles from "./Landing.module.css";

const opportunityTags = ["todas", "bolsas-remuneradas", "estagio", "monitoria", "voluntario"];
const academicTags = ["todas", "pesquisa", "extensao", "eventos", "empreendedorismo"];

function Landing() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [opportunityFilter, setOpportunityFilter] = useState("todas");
  const [academicFilter, setAcademicFilter] = useState("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getNews();
        setNewsList(data);
      } catch (err) {
        console.error("Erro ao carregar notícias do banco:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando Jornal UFC...</div>;

 
  const opportunities = newsList
    .filter((n) =>
      opportunityFilter === "todas"
        ? n.tags?.some((t: string) => ["bolsas-remuneradas", "estagio", "monitoria", "voluntario"].includes(t))
        : n.tags?.includes(opportunityFilter)
    )
    .slice(0, 6);

  
  const academics = newsList
    .filter((n) =>
      academicFilter === "todas"
        ? n.tags?.some((t: string) => ["pesquisa", "extensao", "eventos", "empreendedorismo"].includes(t))
        : n.tags?.includes(academicFilter)
    )
    .slice(0, 6);

  
  const featured = newsList[0] || { 
    titulo: "Sem notícias", 
    conteudo: "Nenhuma notícia cadastrada no sistema.",
    data_publicacao: new Date().toISOString(),
    imagem_url: "",
    tags: []
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informações Relevantes</h1>

      <section className={styles.featuredSection}>
    
        <NewsCard 
          title={featured.titulo} 
          description={featured.conteudo} 
          date={featured.data_publicacao} 
          image={featured.imagem_url || ""}
          tags={featured.tags || []}
        />
        <BusCard />
        <MenuCard />
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>Últimas Oportunidades (Bolsas e Estágio)</h2>
        <div className={styles.filters}>
          {opportunityTags.map((tag) => (
            <button
              key={tag}
              className={opportunityFilter === tag ? styles.active : ""}
              onClick={() => setOpportunityFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <NewsGrid data={opportunities.map(n => ({ 
          ...n, 
          title: n.titulo, 
          description: n.conteudo,
          image: n.imagem_url || "",
          tags: n.tags || [],
          date: n.data_publicacao
        }))} />
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>Pesquisa, Extensão e Comunidade</h2>
        <div className={styles.filters}>
          {academicTags.map((tag) => (
            <button
              key={tag}
              className={academicFilter === tag ? styles.active : ""}
              onClick={() => setAcademicFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
       
        <NewsGrid data={academics.map(n => ({ 
          ...n, 
          title: n.titulo, 
          description: n.conteudo,
          image: n.imagem_url || "",
          tags: n.tags || [],
          date: n.data_publicacao
        }))} />
      </section>
    </div>
  );
}

export default Landing;