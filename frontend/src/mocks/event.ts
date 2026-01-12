export interface Event {
  id: number;
  titulo: string;
  subtitulo: string;
  image: string;
  dataInicio: string;
  dataFim: string;
  horario: string;
  local: string;
  totalVagas: number;
  sobre: string;
  programacao: string[];
  requisitosObservacoes: string[];
  organizador: string;
  emailContato: string;
  telefoneContato: string;
  tag:
    | "Acadêmico"
    | "Cultural"
    | "Esportivo"
    | "Workshops"
    | "Palestras";
  ativo: boolean;
}


export const eventsMock: Event[] = [
  {
    id: 1,
    titulo: "Semana Acadêmica de Computação",
    subtitulo: "Tecnologia, inovação e mercado",
    image: "https://picsum.photos/600/400?random=1",
    dataInicio: "2026-03-10",
    dataFim: "2026-03-14",
    horario: "08:00 às 18:00",
    local: "Auditório Central",
    totalVagas: 300,
    sobre:
      "Evento acadêmico voltado para estudantes de computação e áreas afins. Conta com palestras, minicursos e mesas-redondas. Profissionais do mercado compartilham experiências reais. O objetivo é aproximar alunos da prática profissional. Certificação ao final do evento.",
    programacao: [
      "Palestra de abertura",
      "Minicursos práticos",
      "Mesa-redonda com profissionais",
      "Encerramento e networking",
    ],
    requisitosObservacoes: [
      "Inscrição prévia obrigatória",
      "Evento gratuito",
      "Certificado de participação",
    ],
    organizador: "Coordenação de Computação",
    emailContato: "computacao@universidade.edu",
    telefoneContato: "(11) 99999-0001",
    tag: "Acadêmico",
    ativo: true,
  },
  {
    id: 2,
    titulo: "Festival Cultural Universitário",
    subtitulo: "Arte, música e diversidade",
    image: "https://picsum.photos/600/400?random=2",
    dataInicio: "2026-04-05",
    dataFim: "2026-04-05",
    horario: "14:00 às 22:00",
    local: "Praça Central do Campus",
    totalVagas: 500,
    sobre:
      "Festival cultural com apresentações artísticas e musicais. Aberto para toda a comunidade acadêmica. Valoriza talentos locais e diversidade cultural. Espaço para exposições e performances. Evento ao ar livre.",
    programacao: [
      "Apresentações musicais",
      "Dança e teatro",
      "Exposição artística",
      "Encerramento com show",
    ],
    requisitosObservacoes: [
      "Entrada gratuita",
      "Evento ao ar livre",
      "Sujeito às condições climáticas",
    ],
    organizador: "Diretório Acadêmico",
    emailContato: "cultura@universidade.edu",
    telefoneContato: "(11) 99999-0002",
    tag: "Cultural",
    ativo: true,
  },
  {
    id: 3,
    titulo: "Maratona Esportiva Intercursos",
    subtitulo: "Competição e integração",
    image: "https://picsum.photos/600/400?random=3",
    dataInicio: "2026-05-01",
    dataFim: "2026-05-03",
    horario: "09:00 às 17:00",
    local: "Complexo Esportivo",
    totalVagas: 200,
    sobre:
      "Competição esportiva entre cursos da universidade. Promove integração e espírito esportivo. Modalidades variadas ao longo dos dias. Premiação para os vencedores. Aberto ao público para assistir.",
    programacao: [
      "Abertura oficial",
      "Competições esportivas",
      "Finais",
      "Premiação",
    ],
    requisitosObservacoes: [
      "Inscrição por equipe",
      "Uso de uniforme",
      "Documento com foto",
    ],
    organizador: "Atlética Universitária",
    emailContato: "esportes@universidade.edu",
    telefoneContato: "(11) 99999-0003",
    tag: "Esportivo",
    ativo: true,
  },
  {
    id: 4,
    titulo: "Workshop de UX/UI Design",
    subtitulo: "Do conceito ao protótipo",
    image: "https://picsum.photos/600/400?random=4",
    dataInicio: "2026-06-12",
    dataFim: "2026-06-12",
    horario: "13:00 às 18:00",
    local: "Laboratório de Informática",
    totalVagas: 40,
    sobre:
      "Workshop prático sobre UX/UI Design. Aborda conceitos fundamentais e aplicação prática. Desenvolvimento de protótipos. Voltado para iniciantes e curiosos. Atividade mão na massa.",
    programacao: [
      "Introdução ao UX/UI",
      "Pesquisa e ideação",
      "Prototipagem",
      "Apresentação dos projetos",
    ],
    requisitosObservacoes: [
      "Levar notebook",
      "Vagas limitadas",
      "Conhecimento básico em design é desejável",
    ],
    organizador: "Laboratório de Inovação",
    emailContato: "ux@universidade.edu",
    telefoneContato: "(11) 99999-0004",
    tag: "Workshops",
    ativo: true,
  },
  {
    id: 5,
    titulo: "Ciclo de Palestras: Mercado de TI",
    subtitulo: "Tendências e oportunidades",
    image: "https://picsum.photos/600/400?random=5",
    dataInicio: "2026-07-20",
    dataFim: "2026-07-20",
    horario: "19:00 às 21:30",
    local: "Auditório Bloco B",
    totalVagas: 150,
    sobre:
      "Ciclo de palestras com profissionais de TI. Discussão sobre mercado de trabalho. Tendências tecnológicas atuais. Dicas de carreira. Sessão de perguntas ao final.",
    programacao: [
      "Palestra principal",
      "Painel com convidados",
      "Perguntas e respostas",
    ],
    requisitosObservacoes: [
      "Inscrição gratuita",
      "Certificado disponível",
    ],
    organizador: "Empresa Júnior",
    emailContato: "palestras@universidade.edu",
    telefoneContato: "(11) 99999-0005",
    tag: "Palestras",
    ativo: false,
  },
  {
    id: 6,
    titulo: "Encontro de Pesquisa Científica",
    subtitulo: "Iniciação científica em foco",
    image: "https://picsum.photos/600/400?random=6",
    dataInicio: "2026-08-15",
    dataFim: "2026-08-15",
    horario: "08:30 às 17:00",
    local: "Centro de Convenções",
    totalVagas: 250,
    sobre:
      "Evento voltado à divulgação de pesquisas científicas. Apresentação de trabalhos acadêmicos. Estímulo à iniciação científica. Integração entre pesquisadores. Sessões orais e pôsteres.",
    programacao: [
      "Abertura",
      "Sessões de apresentação",
      "Palestra convidada",
      "Encerramento",
    ],
    requisitosObservacoes: [
      "Submissão prévia de trabalhos",
      "Certificado para participantes",
    ],
    organizador: "Pró-Reitoria de Pesquisa",
    emailContato: "pesquisa@universidade.edu",
    telefoneContato: "(11) 99999-0006",
    tag: "Acadêmico",
    ativo: true,
  },
  {
    id: 7,
    titulo: "Oficina de Oratória",
    subtitulo: "Comunicação que conecta",
    image: "https://picsum.photos/600/400?random=7",
    dataInicio: "2026-09-03",
    dataFim: "2026-09-03",
    horario: "14:00 às 18:00",
    local: "Sala Multiuso",
    totalVagas: 30,
    sobre:
      "Oficina prática para desenvolvimento da oratória. Técnicas de comunicação e postura. Exercícios práticos em grupo. Ideal para apresentações acadêmicas. Feedback individual.",
    programacao: [
      "Introdução",
      "Técnicas de fala",
      "Dinâmicas práticas",
      "Avaliação final",
    ],
    requisitosObservacoes: [
      "Participação ativa",
      "Vagas limitadas",
    ],
    organizador: "Núcleo de Comunicação",
    emailContato: "oratoria@universidade.edu",
    telefoneContato: "(11) 99999-0007",
    tag: "Workshops",
    ativo: false,
  },
  {
    id: 8,
    titulo: "Mostra Cultural de Cinema",
    subtitulo: "Curtas produzidos por alunos",
    image: "https://picsum.photos/600/400?random=8",
    dataInicio: "2026-10-10",
    dataFim: "2026-10-12",
    horario: "18:00 às 22:00",
    local: "Sala de Cinema do Campus",
    totalVagas: 120,
    sobre:
      "Mostra de cinema com produções estudantis. Exibição de curtas-metragens. Debate com realizadores. Incentivo à produção audiovisual. Entrada gratuita.",
    programacao: [
      "Exibição de curtas",
      "Debate com diretores",
      "Premiação simbólica",
    ],
    requisitosObservacoes: [
      "Entrada gratuita",
      "Classificação livre",
    ],
    organizador: "Curso de Audiovisual",
    emailContato: "cinema@universidade.edu",
    telefoneContato: "(11) 99999-0008",
    tag: "Cultural",
    ativo: true,
  },
  {
    id: 9,
    titulo: "Palestra: Inteligência Artificial",
    subtitulo: "Impactos e desafios",
    image: "https://picsum.photos/600/400?random=9",
    dataInicio: "2026-11-05",
    dataFim: "2026-11-05",
    horario: "19:00 às 21:00",
    local: "Auditório Principal",
    totalVagas: 200,
    sobre:
      "Palestra sobre inteligência artificial e seus impactos. Discussão ética e técnica. Casos reais de aplicação. Voltada para estudantes e professores. Espaço para debate.",
    programacao: [
      "Apresentação do tema",
      "Estudos de caso",
      "Debate final",
    ],
    requisitosObservacoes: [
      "Inscrição antecipada",
      "Certificado disponível",
    ],
    organizador: "Departamento de Tecnologia",
    emailContato: "ia@universidade.edu",
    telefoneContato: "(11) 99999-0009",
    tag: "Palestras",
    ativo: true,
  },
  {
    id: 10,
    titulo: "Torneio Universitário de Xadrez",
    subtitulo: "Estratégia e concentração",
    image: "https://picsum.photos/600/400?random=10",
    dataInicio: "2026-12-01",
    dataFim: "2026-12-01",
    horario: "10:00 às 18:00",
    local: "Biblioteca Central",
    totalVagas: 60,
    sobre:
      "Torneio de xadrez aberto à comunidade acadêmica. Incentiva o raciocínio lógico. Partidas eliminatórias. Premiação simbólica. Ambiente silencioso e organizado.",
    programacao: [
      "Credenciamento",
      "Rodadas classificatórias",
      "Final",
      "Premiação",
    ],
    requisitosObservacoes: [
      "Inscrição obrigatória",
      "Conhecimento básico de xadrez",
    ],
    organizador: "Clube de Xadrez",
    emailContato: "xadrez@universidade.edu",
    telefoneContato: "(11) 99999-0010",
    tag: "Esportivo",
    ativo: false,
  },
];
