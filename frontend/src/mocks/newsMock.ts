export interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
}

export type NewsTag =
  | "bolsas-remuneradas"
  | "estagio"
  | "monitoria"
  | "voluntario"
  | "pesquisa"
  | "extensao"
  | "eventos"
  | "empreendedorismo";

export const newsMock: News[] = [
  // 🎓   qBolsas Remuneradas
  {
    id: 1,
    title: "Universidade abre inscrições para bolsas remuneradas",
    description: "Estudantes podem se candidatar a bolsas com apoio financeiro mensal.",
    image: "https://picsum.photos/600/400?random=1",
    date: "2025-01-12",
    tags: ["bolsas-remuneradas"],
  },
  {
    id: 2,
    title: "Programa de bolsas beneficia alunos de baixa renda",
    description: "Iniciativa busca ampliar a permanência estudantil.",
    image: "https://picsum.photos/600/400?random=2",
    date: "2025-01-11",
    tags: ["bolsas-remuneradas"],
  },
  {
    id: 3,
    title: "Novas bolsas remuneradas são anunciadas para 2025",
    description: "Edital contempla diversas áreas acadêmicas.",
    image: "https://picsum.photos/600/400?random=3",
    date: "2025-01-10",
    tags: ["bolsas-remuneradas"],
  },

  // 💼 Estágio
  {
    id: 4,
    title: "Empresas ampliam vagas de estágio para universitários",
    description: "Oportunidades incluem áreas de tecnologia e educação.",
    image: "https://picsum.photos/600/400?random=4",
    date: "2025-01-09",
    tags: ["estagio"],
  },
  {
    id: 5,
    title: "Estágios remunerados ganham destaque em 2025",
    description: "Mercado busca jovens talentos em formação.",
    image: "https://picsum.photos/600/400?random=5",
    date: "2025-01-08",
    tags: ["estagio"],
  },
  {
    id: 6,
    title: "Universidade firma parcerias para programas de estágio",
    description: "Convênios fortalecem a experiência prática dos alunos.",
    image: "https://picsum.photos/600/400?random=6",
    date: "2025-01-07",
    tags: ["estagio"],
  },

  // 📘 Monitoria
  {
    id: 7,
    title: "Edital de monitoria acadêmica é divulgado",
    description: "Alunos podem atuar no apoio a disciplinas.",
    image: "https://picsum.photos/600/400?random=7",
    date: "2025-01-06",
    tags: ["monitoria"],
  },
  {
    id: 8,
    title: "Monitoria fortalece aprendizado colaborativo",
    description: "Programa aproxima alunos e professores.",
    image: "https://picsum.photos/600/400?random=8",
    date: "2025-01-05",
    tags: ["monitoria"],
  },
  {
    id: 9,
    title: "Universidade amplia vagas de monitoria",
    description: "Mais disciplinas passam a contar com monitores.",
    image: "https://picsum.photos/600/400?random=9",
    date: "2025-01-04",
    tags: ["monitoria"],
  },

  // 🤝 Voluntário
  {
    id: 10,
    title: "Projeto voluntário impacta comunidades locais",
    description: "Ações sociais envolvem estudantes universitários.",
    image: "https://picsum.photos/600/400?random=10",
    date: "2025-01-03",
    tags: ["voluntario"],
  },
  {
    id: 11,
    title: "Universidade incentiva trabalho voluntário",
    description: "Atividades contribuem para formação cidadã.",
    image: "https://picsum.photos/600/400?random=11",
    date: "2025-01-02",
    tags: ["voluntario"],
  },
  {
    id: 12,
    title: "Voluntariado estudantil cresce no Brasil",
    description: "Projetos sociais ganham apoio acadêmico.",
    image: "https://picsum.photos/600/400?random=12",
    date: "2025-01-01",
    tags: ["voluntario"],
  },

  // 🔬 Pesquisa
  {
    id: 13,
    title: "Pesquisas acadêmicas recebem novos investimentos",
    description: "Editais fomentam inovação científica.",
    image: "https://picsum.photos/600/400?random=13",
    date: "2024-12-30",
    tags: ["pesquisa"],
  },
  {
    id: 14,
    title: "Estudantes participam de projetos de pesquisa",
    description: "Iniciação científica ganha força.",
    image: "https://picsum.photos/600/400?random=14",
    date: "2024-12-29",
    tags: ["pesquisa"],
  },
  {
    id: 15,
    title: "Universidade apresenta resultados de pesquisas",
    description: "Trabalhos impactam a sociedade.",
    image: "https://picsum.photos/600/400?random=15",
    date: "2024-12-28",
    tags: ["pesquisa"],
  },

  // 🌱 Extensão
  {
    id: 16,
    title: "Projetos de extensão aproximam universidade da comunidade",
    description: "Ações promovem inclusão social.",
    image: "https://picsum.photos/600/400?random=16",
    date: "2024-12-27",
    tags: ["extensao"],
  },
  {
    id: 17,
    title: "Extensão universitária gera impacto regional",
    description: "Atividades envolvem alunos e professores.",
    image: "https://picsum.photos/600/400?random=17",
    date: "2024-12-26",
    tags: ["extensao"],
  },
  {
    id: 18,
    title: "Novos projetos de extensão são lançados",
    description: "Editais incentivam participação estudantil.",
    image: "https://picsum.photos/600/400?random=18",
    date: "2024-12-25",
    tags: ["extensao"],
  },

  // 📅 Eventos
  {
    id: 19,
    title: "Evento acadêmico reúne especialistas nacionais",
    description: "Palestras discutem inovação e tecnologia.",
    image: "https://picsum.photos/600/400?random=19",
    date: "2024-12-24",
    tags: ["eventos"],
  },
  {
    id: 20,
    title: "Semana universitária promove integração",
    description: "Programação inclui oficinas e debates.",
    image: "https://picsum.photos/600/400?random=20",
    date: "2024-12-23",
    tags: ["eventos"],
  },
  {
    id: 21,
    title: "Congresso estudantil movimenta o campus",
    description: "Evento destaca produções acadêmicas.",
    image: "https://picsum.photos/600/400?random=21",
    date: "2024-12-22",
    tags: ["eventos"],
  },

  // 🚀 Empreendedorismo
  {
    id: 22,
    title: "Universidade incentiva empreendedorismo jovem",
    description: "Programas apoiam ideias inovadoras.",
    image: "https://picsum.photos/600/400?random=22",
    date: "2024-12-21",
    tags: ["empreendedorismo"],
  },
  {
    id: 23,
    title: "Startups universitárias ganham destaque",
    description: "Projetos surgem dentro do ambiente acadêmico.",
    image: "https://picsum.photos/600/400?random=23",
    date: "2024-12-20",
    tags: ["empreendedorismo"],
  },
  {
    id: 24,
    title: "Hackathon impulsiona empreendedorismo estudantil",
    description: "Evento estimula inovação e criatividade.",
    image: "https://picsum.photos/600/400?random=24",
    date: "2024-12-19",
    tags: ["empreendedorismo"],
  },
];
