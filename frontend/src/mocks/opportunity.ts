export type OpportunityType =
  | "bolsas-remuneradas"
  | "estagio"
  | "monitoria"
  | "voluntario";

export interface Opportunity {
  id: number;
  title: string;

  descricao: string;
  sobre: string;
  requisitos: string[];
  beneficios: string[];

  departamento: string;
  professorResponsavel: string;
  cargaHorariaSemanal: number;
  duracao: string;

  prazoInscricao: string;
  valor: number;

  image: string;
  date: string;
  tipo: OpportunityType;
}

export const opportunitiesMock: Opportunity[] = [
  // 🎓 BOLSAS REMUNERADAS
  {
    id: 1,
    title: "Bolsa remunerada para apoio em laboratório de informática",
    descricao: "Atuação no suporte técnico e organização do laboratório.",
    sobre:
      "A bolsa remunerada tem como objetivo apoiar o funcionamento do laboratório de informática da universidade. "
      + "O estudante selecionado irá auxiliar alunos e professores no uso dos computadores e softwares acadêmicos. "
      + "Também será responsável pela organização do espaço e verificação básica dos equipamentos. "
      + "A atividade proporciona contato direto com a rotina universitária e desenvolvimento de responsabilidade profissional. "
      + "Trata-se de uma oportunidade de aprendizado prático aliada ao apoio financeiro mensal.",
    requisitos: [
      "Estar regularmente matriculado",
      "Conhecimentos básicos em informática",
      "Disponibilidade de 20h semanais",
    ],
    beneficios: ["Bolsa mensal", "Experiência prática", "Certificado"],
    departamento: "Departamento de Computação",
    professorResponsavel: "Prof. Dr. Carlos Silva",
    cargaHorariaSemanal: 20,
    duracao: "12 meses",
    prazoInscricao: "2025-03-15",
    valor: 700,
    image: "https://picsum.photos/600/400?random=1",
    date: "2025-01-12",
    tipo: "bolsas-remuneradas",
  },
  {
    id: 2,
    title: "Bolsa remunerada para apoio administrativo",
    descricao: "Auxílio em rotinas administrativas institucionais.",
    sobre:
      "Esta bolsa é voltada para estudantes interessados em conhecer a rotina administrativa da universidade. "
      + "O bolsista irá auxiliar no atendimento ao público, organização de documentos e apoio aos servidores do setor. "
      + "As atividades contribuem para o desenvolvimento de organização, comunicação e responsabilidade. "
      + "O estudante terá contato com processos internos e normas institucionais. "
      + "A bolsa oferece apoio financeiro e experiência profissional relevante.",
    requisitos: [
      "Boa comunicação",
      "Organização",
      "Disponibilidade de 20h semanais",
    ],
    beneficios: ["Bolsa mensal", "Vivência administrativa"],
    departamento: "Secretaria Acadêmica",
    professorResponsavel: "Profa. Maria Oliveira",
    cargaHorariaSemanal: 20,
    duracao: "10 meses",
    prazoInscricao: "2025-03-10",
    valor: 650,
    image: "https://picsum.photos/600/400?random=2",
    date: "2025-01-11",
    tipo: "bolsas-remuneradas",
  },
  {
    id: 3,
    title: "Bolsa remunerada para apoio em biblioteca",
    descricao: "Apoio no atendimento e organização do acervo.",
    sobre:
      "A bolsa tem como foco o apoio às atividades da biblioteca universitária. "
      + "O estudante auxiliará no atendimento aos usuários, organização de livros e controle do acervo. "
      + "Também participará de atividades relacionadas ao empréstimo e devolução de materiais. "
      + "A experiência contribui para o desenvolvimento de responsabilidade e atenção aos detalhes. "
      + "É uma oportunidade de aprendizado em um ambiente acadêmico organizado.",
    requisitos: [
      "Responsabilidade",
      "Disponibilidade de 16h semanais",
    ],
    beneficios: ["Bolsa mensal", "Certificado"],
    departamento: "Biblioteca Central",
    professorResponsavel: "Prof. João Pereira",
    cargaHorariaSemanal: 16,
    duracao: "8 meses",
    prazoInscricao: "2025-03-05",
    valor: 600,
    image: "https://picsum.photos/600/400?random=3",
    date: "2025-01-10",
    tipo: "bolsas-remuneradas",
  },

  // 💼 ESTÁGIO
  {
    id: 4,
    title: "Estágio para desenvolvimento de sistemas acadêmicos",
    descricao: "Atuação no desenvolvimento de aplicações institucionais.",
    sobre:
      "O estágio oferece ao estudante a oportunidade de atuar no desenvolvimento de sistemas utilizados pela universidade. "
      + "O estagiário participará da implementação e manutenção de aplicações web internas. "
      + "Haverá acompanhamento técnico por profissionais da área de tecnologia. "
      + "A experiência contribui para o desenvolvimento de habilidades práticas em programação. "
      + "É indicado para alunos que desejam vivência real no ambiente de TI.",
    requisitos: [
      "Curso de TI ou áreas afins",
      "Conhecimento básico em JavaScript",
    ],
    beneficios: ["Bolsa estágio", "Vale-transporte"],
    departamento: "Diretoria de Tecnologia da Informação",
    professorResponsavel: "Profa. Ana Ribeiro",
    cargaHorariaSemanal: 30,
    duracao: "6 meses",
    prazoInscricao: "2025-02-28",
    valor: 1200,
    image: "https://picsum.photos/600/400?random=4",
    date: "2025-01-09",
    tipo: "estagio",
  },
  {
    id: 5,
    title: "Estágio para suporte em redes e infraestrutura",
    descricao: "Suporte técnico em redes e equipamentos.",
    sobre:
      "O estágio é voltado para estudantes interessados na área de infraestrutura de TI. "
      + "O estagiário auxiliará no suporte a redes, computadores e equipamentos institucionais. "
      + "As atividades incluem atendimento a chamados e acompanhamento técnico. "
      + "O estágio proporciona contato direto com o ambiente profissional de TI. "
      + "É uma excelente oportunidade de aprendizado prático.",
    requisitos: [
      "Noções de redes",
      "Disponibilidade de 30h semanais",
    ],
    beneficios: ["Bolsa estágio", "Aprendizado técnico"],
    departamento: "Infraestrutura de TI",
    professorResponsavel: "Prof. Marcos Lima",
    cargaHorariaSemanal: 30,
    duracao: "6 meses",
    prazoInscricao: "2025-02-20",
    valor: 1100,
    image: "https://picsum.photos/600/400?random=5",
    date: "2025-01-08",
    tipo: "estagio",
  },
  {
    id: 6,
    title: "Estágio para apoio pedagógico",
    descricao: "Apoio em atividades educacionais.",
    sobre:
      "Este estágio é destinado a estudantes da área educacional. "
      + "O estagiário auxiliará professores no acompanhamento de alunos e atividades pedagógicas. "
      + "Também participará da organização de materiais didáticos. "
      + "A experiência contribui para o desenvolvimento profissional na área de educação. "
      + "É uma oportunidade de vivência prática no ambiente escolar.",
    requisitos: [
      "Curso de Pedagogia ou Licenciaturas",
      "Boa comunicação",
    ],
    beneficios: ["Bolsa estágio", "Experiência educacional"],
    departamento: "Coordenação Pedagógica",
    professorResponsavel: "Profa. Luciana Costa",
    cargaHorariaSemanal: 25,
    duracao: "6 meses",
    prazoInscricao: "2025-02-18",
    valor: 1000,
    image: "https://picsum.photos/600/400?random=6",
    date: "2025-01-07",
    tipo: "estagio",
  },

  // 📘 MONITORIA
  {
    id: 7,
    title: "Monitoria para disciplina de Algoritmos",
    descricao: "Apoio acadêmico aos alunos da disciplina.",
    sobre:
      "A monitoria tem como objetivo auxiliar alunos na disciplina de Algoritmos. "
      + "O monitor prestará apoio em exercícios, trabalhos e esclarecimento de dúvidas. "
      + "As atividades serão supervisionadas pelo professor responsável. "
      + "A experiência contribui para o aprofundamento do conhecimento acadêmico. "
      + "É indicada para alunos com bom desempenho na disciplina.",
    requisitos: [
      "Aprovação na disciplina",
      "Bom rendimento acadêmico",
    ],
    beneficios: ["Bolsa mensal", "Certificado"],
    departamento: "Departamento de Computação",
    professorResponsavel: "Prof. Marcos Lima",
    cargaHorariaSemanal: 12,
    duracao: "1 semestre",
    prazoInscricao: "2025-02-10",
    valor: 500,
    image: "https://picsum.photos/600/400?random=7",
    date: "2025-01-06",
    tipo: "monitoria",
  },
  {
    id: 8,
    title: "Monitoria para disciplina de Matemática",
    descricao: "Auxílio didático em matemática.",
    sobre:
      "A monitoria visa apoiar alunos da disciplina de Matemática. "
      + "O monitor auxiliará na resolução de exercícios e revisão de conteúdos. "
      + "Haverá acompanhamento do professor responsável. "
      + "A atividade contribui para o fortalecimento do aprendizado colaborativo. "
      + "É indicada para estudantes com bom desempenho acadêmico.",
    requisitos: ["Bom desempenho em Matemática"],
    beneficios: ["Bolsa mensal", "Experiência acadêmica"],
    departamento: "Departamento de Matemática",
    professorResponsavel: "Profa. Helena Rocha",
    cargaHorariaSemanal: 10,
    duracao: "1 semestre",
    prazoInscricao: "2025-02-08",
    valor: 450,
    image: "https://picsum.photos/600/400?random=8",
    date: "2025-01-05",
    tipo: "monitoria",
  },
  {
    id: 9,
    title: "Monitoria para disciplina de Física",
    descricao: "Suporte acadêmico em Física.",
    sobre:
      "A monitoria tem como foco auxiliar alunos da disciplina de Física. "
      + "O monitor atuará no apoio a exercícios e atividades práticas. "
      + "As ações serão supervisionadas pelo docente responsável. "
      + "A experiência fortalece o domínio do conteúdo acadêmico. "
      + "É indicada para estudantes com bom rendimento na disciplina.",
    requisitos: ["Aprovação prévia na disciplina"],
    beneficios: ["Bolsa mensal"],
    departamento: "Departamento de Física",
    professorResponsavel: "Prof. Ricardo Alves",
    cargaHorariaSemanal: 10,
    duracao: "1 semestre",
    prazoInscricao: "2025-02-06",
    valor: 450,
    image: "https://picsum.photos/600/400?random=9",
    date: "2025-01-04",
    tipo: "monitoria",
  },

  // 🤝 VOLUNTÁRIO
  {
    id: 10,
    title: "Voluntário para projeto de inclusão digital",
    descricao: "Atuação em oficinas de informática básica.",
    sobre:
      "O projeto de inclusão digital tem como objetivo capacitar a comunidade local. "
      + "O voluntário atuará em oficinas de informática básica e apoio aos participantes. "
      + "As atividades contribuem para o desenvolvimento social e educacional. "
      + "O projeto promove cidadania e acesso à tecnologia. "
      + "É uma oportunidade de impacto social e aprendizado humano.",
    requisitos: ["Interesse em ações sociais"],
    beneficios: ["Certificado", "Horas complementares"],
    departamento: "Projeto de Extensão",
    professorResponsavel: "Prof. João Mendes",
    cargaHorariaSemanal: 8,
    duracao: "4 meses",
    prazoInscricao: "2025-04-01",
    valor: 0,
    image: "https://picsum.photos/600/400?random=10",
    date: "2025-01-03",
    tipo: "voluntario",
  },
  {
    id: 11,
    title: "Voluntário para apoio em eventos acadêmicos",
    descricao: "Apoio logístico em eventos institucionais.",
    sobre:
      "A atividade voluntária envolve o apoio na organização de eventos acadêmicos. "
      + "O voluntário auxiliará na recepção, organização e suporte aos participantes. "
      + "A experiência contribui para o desenvolvimento de trabalho em equipe. "
      + "Também promove integração com a comunidade acadêmica. "
      + "É indicada para estudantes proativos.",
    requisitos: ["Disponibilidade nos dias de evento"],
    beneficios: ["Certificado"],
    departamento: "Coordenação de Eventos",
    professorResponsavel: "Profa. Daniela Souza",
    cargaHorariaSemanal: 6,
    duracao: "3 meses",
    prazoInscricao: "2025-03-20",
    valor: 0,
    image: "https://picsum.photos/600/400?random=11",
    date: "2025-01-02",
    tipo: "voluntario",
  },
  {
    id: 12,
    title: "Voluntário para ações de conscientização ambiental",
    descricao: "Participação em ações ambientais.",
    sobre:
      "O projeto ambiental busca promover conscientização sobre sustentabilidade. "
      + "O voluntário participará de ações educativas e atividades comunitárias. "
      + "As atividades contribuem para a preservação ambiental. "
      + "O projeto incentiva responsabilidade social e ambiental. "
      + "É uma oportunidade de aprendizado e engajamento.",
    requisitos: ["Interesse em meio ambiente"],
    beneficios: ["Certificado", "Experiência social"],
    departamento: "Projeto Ambiental",
    professorResponsavel: "Prof. André Lima",
    cargaHorariaSemanal: 6,
    duracao: "3 meses",
    prazoInscricao: "2025-03-25",
    valor: 0,
    image: "https://picsum.photos/600/400?random=12",
    date: "2025-01-01",
    tipo: "voluntario",
  },
];
