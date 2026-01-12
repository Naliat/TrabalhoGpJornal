import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Heart, Apple, FileText, 
  BookOpen, GraduationCap, 
  ExternalLink, Wifi, Monitor, 
  Layout, Globe, Cpu, Palette, CreditCard, 
  Utensils, Calendar, Library, MailPlus, Search,
  Building2, Microscope
} from "lucide-react";
import styles from "./Assistencia.module.css";
import SimpleFooter from "../../components/Footer/SimpleFooter";

interface CardItem {
  id: number;
  tipo: 'white' | 'blue' | 'outline';
  icone: React.ReactNode;
  titulo: string;
  url: string;
  isExternal?: boolean;
  desc?: string;
  linkTexto?: string;
  btn?: string;
}

interface Secao {
  titulo: string;
  icone: React.ReactNode;
  cards: CardItem[];
}

const Assistencia: React.FC = () => {
  const [busca, setBusca] = useState("");

  const secoes: Secao[] = [
    {
      titulo: "Portal Campus Quixadá",
      icone: <Building2 className={styles.sectionIcon} />,
      cards: [
        { id: 20, tipo: 'white', url: "https://www.quixada.ufc.br/", isExternal: true, icone: <Building2 color="#3b82f6" />, titulo: "Site Oficial Quixadá", desc: "Acesse todas as notícias, eventos e informações institucionais do campus.", linkTexto: "Acessar Portal" },
        { id: 21, tipo: 'white', url: "https://www.instagram.com/ufcquixada/", isExternal: true, icone: <Calendar color="#3b82f6" />, titulo: "Calendário do Campus", desc: "Datas específicas, feriados locais e eventos do Campus de Quixadá.", linkTexto: "Ver Datas" },
      ]
    },
   {
  titulo: "Pós-Graduação",
  icone: <Microscope className={styles.sectionIcon} />,
  cards: [
    { 
      id: 22, 
      tipo: 'white', 
      url: "https://pcomp.quixada.ufc.br/", 
      isExternal: true, 
      icone: <Microscope color="#3b82f6" />, 
      titulo: "Mestrado em Computação", 
      desc: "Informações sobre o Mestrado em Ciência da Computação (PCOMP).", 
      linkTexto: "Saiba mais" 
    },
    { 
      id: 23, 
      tipo: 'white', 
      url: "https://pcomp.quixada.ufc.br/linhas-de-pesquisa/", 
      isExternal: true, 
      icone: <GraduationCap color="#3b82f6" />, 
      titulo: "Linhas de Pesquisa", 
      desc: "Explore as áreas de concentração e projetos de pesquisa desenvolvidos no campus.", 
      linkTexto: "Ver Linhas" 
    },
  ]
},
    {
      titulo: "Serviços Digitais e Primeiros Passos",
      icone: <Monitor className={styles.sectionIcon} />,
      cards: [
        { id: 1, tipo: 'white', url: "https://sisu.ufc.br/pt/alunos-da-ufc-podem-criar-conta-de-e-mail-alu-ufc-br-veja-tutorial/", isExternal: true, icone: <MailPlus color="#3b82f6" />, titulo: "E-mail Institucional", desc: "Como criar seu e-mail @alu.ufc.br para acesso a benefícios acadêmicos.", linkTexto: "Criar e-mail" },
        { id: 2, tipo: 'white', url: "https://sistemas.quixada.ufc.br/", isExternal: true, icone: <Layout color="#3b82f6" />, titulo: "Sistemas UFC Quixadá", desc: "Principais sistemas da Universidade Federal do Ceará - Quixadá", linkTexto: "Acessar Sistemas" },
        { id: 3, tipo: 'white', url: "https://ajuda.eduroam.ufc.br/", isExternal: true, icone: <Wifi color="#3b82f6" />, titulo: "Eduroam", desc: "Configure o Wi-Fi acadêmico com roaming global no seu dispositivo.", linkTexto: "Configurar Wi-Fi" },
      ]
    },
    {
      titulo: "Apoio e Bem-Estar",
      icone: <Users className={styles.sectionIcon} />,
      cards: [
        { id: 4, tipo: 'white', url: "https://www.quixada.ufc.br/servicosocial/", isExternal: true, icone: <Heart color="#3b82f6" />, titulo: "Serviço Social", desc: "Orientação sobre direitos, auxílios e acompanhamento socioassistencial.", linkTexto: "Agendar conversa" },
        { id: 5, tipo: 'white', url: "https://www.quixada.ufc.br/nutricao/", isExternal: true, icone: <Apple color="#3b82f6" />, titulo: "Nutrição", desc: "Atendimento nutricional e orientações sobre alimentação para estudantes.", linkTexto: "Saiba mais" },
      ]
    },
    {
      titulo: "Restaurante Universitário",
      icone: <Utensils className={styles.sectionIcon} />,
      cards: [
        { id: 7, tipo: 'blue', url: "https://si3.ufc.br/public//jsp/restaurante_universitario/consulta_comensal_ru.jsf", icone: <CreditCard color="#0284c7" />, titulo: "Recarregar Créditos", desc: "Gere o boleto ou PIX para recarregar seu cartão do RU via SIGAA.", btn: "Recarregar" },
        { id: 8, tipo: 'blue', url: "https://www.ufc.br/restaurante/cardapio", icone: <Utensils color="#0284c7" />, titulo: "Cardápio Semanal", desc: "Confira o que será servido no almoço e jantar do campus hoje.", btn: "Ver Cardápio" },
      ]
    },
    {
      titulo: "Cursos e Matrizes Curriculares",
      icone: <GraduationCap className={styles.sectionIcon} />,
      cards: [
        { id: 10, tipo: 'outline', url: "https://es.quixada.ufc.br/", isExternal: true, icone: <Monitor size={20} />, titulo: "Engenharia de Software", linkTexto: "Ver Grade" },
        { id: 11, tipo: 'outline', url: "https://si.quixada.ufc.br/", isExternal: true, icone: <Globe size={20} />, titulo: "Sistemas de Informação.", linkTexto: "Ver Grade" },
        { id: 12, tipo: 'outline', url: "https://rc.quixada.ufc.br/", isExternal: true, icone: <Wifi size={20} />, titulo: "Redes de Computadores.", linkTexto: "Ver Grade" },
        { id: 13, tipo: 'outline', url: "https://ec.quixada.ufc.br/", isExternal: true, icone: <Cpu size={20} />, titulo: "Engenharia de Computação.", linkTexto: "Ver Grade" },
        { id: 14, tipo: 'outline', url: "https://www.quixada.ufc.br/dd/", isExternal: true, icone: <Palette size={20} />, titulo: "Design Digital", linkTexto: "Ver Grade" },
        { id: 15, tipo: 'outline', url: "https://cc.quixada.ufc.br/", isExternal: true, icone: <BookOpen size={20} />, titulo: "Ciência da Computação.", linkTexto: "Ver Grade" },
      ]
    },
    {
      titulo: "Biblioteca e Secretaria",
      icone: <Library className={styles.sectionIcon} />,
      cards: [
        { id: 16, tipo: 'white', url: "https://www.quixada.ufc.br/biblioteca/", isExternal: true, icone: <Library color="#3b82f6" />, titulo: "Biblioteca UFC", desc: "Serviços presenciais, empréstimos e normas da biblioteca do campus.", linkTexto: "Informações" },
        { id: 17, tipo: 'white', url: "https://pergamum.ufc.br/", isExternal: true, icone: <BookOpen color="#3b82f6" />, titulo: "Pergamum", desc: "Consulta ao acervo online e renovação de livros pendentes.", linkTexto: "Acessar Sistema" },
        { id: 18, tipo: 'white', url: "https://www.ufc.br/calendario-universitario/2025", isExternal: true, icone: <Calendar color="#3b82f6" />, titulo: "Calendário UFC", desc: "Fique por dentro de prazos de matrícula, feriados e recesso escolar.", linkTexto: "Ver Datas" },
        { id: 19, tipo: 'white', url: "https://www.quixada.ufc.br/secretaria-academica/", isExternal: true, icone: <FileText color="#3b82f6" />, titulo: "Secretaria Acadêmica", desc: "Emissão de documentos, histórico escolar e processos de graduação.", linkTexto: "Atendimento" },
      ]
    }
  ];

  const renderCard = (card: CardItem) => {
    const key = `card-${card.id}`;
    const CardLink = ({ children, className }: { children: React.ReactNode, className?: string }) => {
      if (card.isExternal) {
        return <a href={card.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
      }
      return <Link to={card.url} className={className}>{children}</Link>;
    };

    if (card.tipo === 'white') {
      return (
        <div key={key} className={styles.whiteCard}>
          {card.icone}
          <h3>{card.titulo}</h3>
          <p>{card.desc}</p>
          <CardLink className={styles.cardActionLink}>
            {card.linkTexto} <ExternalLink size={14} />
          </CardLink>
        </div>
      );
    }
    if (card.tipo === 'blue') {
      return (
        <div key={key} className={styles.blueLightCard}>
          {card.icone}
          <h3>{card.titulo}</h3>
          <p>{card.desc}</p>
          <CardLink>
            <button className={styles.blueButton}>{card.btn}</button>
          </CardLink>
        </div>
      );
    }
    return (
      <div key={key} className={styles.outlineCard}>
        {card.icone} <h4>{card.titulo}</h4> 
        <CardLink className={styles.cardActionLink}>
          {card.linkTexto}
        </CardLink>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <button className={styles.backButton} onClick={() => window.history.back()}>← Voltar para Home</button>
            <h1>Assistência Estudantil – PRAE</h1>
            <p>Centralizamos serviços, auxílios e ações de apoio à permanência estudantil.</p>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Buscar serviço (ex: Moodle, RU, Bolsa...)" 
                className={styles.searchInput}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </section>

        {secoes.map((secao, idx) => {
          const cardsFiltrados = secao.cards.filter(card => 
            card.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            (card.desc && card.desc.toLowerCase().includes(busca.toLowerCase()))
          );

          if (cardsFiltrados.length === 0) return null;

          return (
            <section key={`secao-${idx}`} className={styles.section}>
              <div className={styles.sectionHeader}>
                {secao.icone}
                <h2>{secao.titulo}</h2>
              </div>
              <div className={styles.grid}>
                {cardsFiltrados.map(card => renderCard(card))}
              </div>
            </section>
          );
        })}
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Assistencia;