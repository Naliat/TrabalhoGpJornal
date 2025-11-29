export interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

export const newsMock: News[] = [
  {
    id: 1,
    title: "Avanço tecnológico transforma o ensino no Brasil",
    description: "Plataformas digitais ganham força e revolucionam a educação.",
    image: "https://picsum.photos/600/400?random=1",
    date: "2025-01-12",
  },
  {
    id: 2,
    title: "Pesquisa revela aumento no uso de IA nas escolas",
    description: "Ferramentas inteligentes começam a ser adotadas na sala de aula.",
    image: "https://picsum.photos/600/400?random=2",
    date: "2025-01-10",
  },
  {
    id: 3,
    title: "Nova lei promete investimento em tecnologia educacional",
    description: "Projeto busca ampliar o acesso a ferramentas digitais.",
    image: "https://picsum.photos/600/400?random=3",
    date: "2025-01-09",
  },
  {
    id: 4,
    title: "Professores aderem ao ensino híbrido",
    description: "Modelo híbrido cresce e se torna tendência.",
    image: "https://picsum.photos/600/400?random=4",
    date: "2025-01-08",
  },
  {
    id: 5,
    title: "Estudantes elogiam novas plataformas virtuais",
    description: "Ambientes digitais aumentam o engajamento.",
    image: "https://picsum.photos/600/400?random=5",
    date: "2025-01-07",
  },
  {
    id: 6,
    title: "Brasil investe em infraestrutura tecnológica",
    description: "Cidades recebem novos laboratórios educacionais.",
    image: "https://picsum.photos/600/400?random=6",
    date: "2025-01-06",
  },
  {
    id: 7,
    title: "Aplicativo educacional alcança 1 milhão de usuários",
    description: "Ferramenta se destaca pela gamificação de conteúdos.",
    image: "https://picsum.photos/600/400?random=7",
    date: "2025-01-05",
  },
  {
    id: 8,
    title: "Plataformas online garantem inclusão digital",
    description: "Alunos de regiões distantes têm mais acesso a conteúdos.",
    image: "https://picsum.photos/600/400?random=8",
    date: "2025-01-04",
  },
  {
    id: 9,
    title: "Especialistas discutem o futuro da educação no Brasil",
    description: "Conferência internacional reúne líderes da área.",
    image: "https://picsum.photos/600/400?random=9",
    date: "2025-01-03",
  },
  {
    id: 10,
    title: "Escolas adotam ferramentas de análise de desempenho",
    description: "Tecnologias permitem acompanhamento detalhado de alunos.",
    image: "https://picsum.photos/600/400?random=10",
    date: "2025-01-02",
  },
];
