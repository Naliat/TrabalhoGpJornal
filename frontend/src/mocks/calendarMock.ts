export type CalendarEventType =
  | "academico"
  | "administrativo"
  | "ferias"
  | "feriado";

export interface CalendarEvent {
  id: number;
  mes: string;
  tipo: CalendarEventType;

  inicio: string;
  fim?: string;
  duracao: number;

  titulo: string;
  descricao: string;
  sistema?: string;
}

export const calendarMock: CalendarEvent[] = [
  // =======================
  // JANEIRO
  // =======================
  {
    id: 1,
    mes: "Janeiro 2026",
    tipo: "administrativo",
    inicio: "2026-01-20",
    fim: "2026-01-31",
    duracao: 12,
    titulo: "Matrícula – Veteranos",
    descricao:
      "Período de matrícula para alunos veteranos em disciplinas do semestre 2026.1.",
    sistema: "SIGAA",
  },

  // =======================
  // FEVEREIRO
  // =======================
  {
    id: 2,
    mes: "Fevereiro 2026",
    tipo: "administrativo",
    inicio: "2026-02-01",
    fim: "2026-02-02",
    duracao: 2,
    titulo: "Matrícula – Calouros",
    descricao:
      "Período de matrícula para alunos ingressantes no semestre 2026.1.",
    sistema: "SIGAA",
  },
  {
    id: 3,
    mes: "Fevereiro 2026",
    tipo: "academico",
    inicio: "2026-02-03",
    duracao: 1,
    titulo: "Início das Aulas – 2026.1",
    descricao:
      "Início do semestre letivo 2026.1 para todos os cursos de graduação.",
  },
  {
    id: 4,
    mes: "Fevereiro 2026",
    tipo: "administrativo",
    inicio: "2026-02-03",
    fim: "2026-02-14",
    duracao: 12,
    titulo: "Ajuste de Matrícula",
    descricao:
      "Período para ajuste de matrícula (adição e remoção de disciplinas).",
    sistema: "SIGAA",
  },
  {
    id: 5,
    mes: "Fevereiro 2026",
    tipo: "feriado",
    inicio: "2026-02-16",
    fim: "2026-02-18",
    duracao: 3,
    titulo: "Carnaval",
    descricao: "Recesso acadêmico. Não haverá aulas.",
  },

  // =======================
  // MARÇO
  // =======================
  {
    id: 6,
    mes: "Março 2026",
    tipo: "academico",
    inicio: "2026-03-25",
    duracao: 1,
    titulo: "Avaliação Institucional",
    descricao:
      "Aplicação da avaliação institucional para alunos de graduação.",
  },

  // =======================
  // ABRIL
  // =======================
  {
    id: 7,
    mes: "Abril 2026",
    tipo: "feriado",
    inicio: "2026-04-03",
    duracao: 1,
    titulo: "Sexta-feira Santa",
    descricao: "Feriado nacional.",
  },
  {
    id: 8,
    mes: "Abril 2026",
    tipo: "academico",
    inicio: "2026-04-20",
    fim: "2026-04-24",
    duracao: 5,
    titulo: "Semana de Provas – 2026.1",
    descricao:
      "Período destinado à realização das avaliações parciais.",
  },

  // =======================
  // MAIO
  // =======================
  {
    id: 9,
    mes: "Maio 2026",
    tipo: "feriado",
    inicio: "2026-05-01",
    duracao: 1,
    titulo: "Dia do Trabalhador",
    descricao: "Feriado nacional.",
  },
  {
    id: 10,
    mes: "Maio 2026",
    tipo: "academico",
    inicio: "2026-05-18",
    fim: "2026-05-22",
    duracao: 5,
    titulo: "Submissão de Trabalhos Finais",
    descricao:
      "Prazo final para entrega de trabalhos das disciplinas.",
  },

  // =======================
  // JUNHO
  // =======================
  {
    id: 11,
    mes: "Junho 2026",
    tipo: "academico",
    inicio: "2026-06-15",
    fim: "2026-06-19",
    duracao: 5,
    titulo: "Semana de Provas Finais – 2026.1",
    descricao:
      "Período de avaliações finais do semestre 2026.1.",
  },

  // =======================
  // JULHO
  // =======================
  {
    id: 12,
    mes: "Julho 2026",
    tipo: "academico",
    inicio: "2026-07-01",
    duracao: 1,
    titulo: "Encerramento do Semestre – 2026.1",
    descricao:
      "Término oficial das atividades acadêmicas do semestre.",
  },
  {
    id: 13,
    mes: "Julho 2026",
    tipo: "ferias",
    inicio: "2026-07-04",
    fim: "2026-07-31",
    duracao: 28,
    titulo: "Férias Acadêmicas",
    descricao:
      "Período de férias para alunos e docentes.",
  },

  // =======================
  // AGOSTO
  // =======================
  {
    id: 14,
    mes: "Agosto 2026",
    tipo: "administrativo",
    inicio: "2026-08-01",
    fim: "2026-08-05",
    duracao: 5,
    titulo: "Matrícula – Veteranos 2026.2",
    descricao:
      "Período de matrícula para o semestre 2026.2.",
    sistema: "SIGAA",
  },
  {
    id: 15,
    mes: "Agosto 2026",
    tipo: "academico",
    inicio: "2026-08-06",
    duracao: 1,
    titulo: "Início das Aulas – 2026.2",
    descricao:
      "Início do semestre letivo 2026.2.",
  },

  // =======================
  // SETEMBRO
  // =======================
  {
    id: 16,
    mes: "Setembro 2026",
    tipo: "feriado",
    inicio: "2026-09-07",
    duracao: 1,
    titulo: "Independência do Brasil",
    descricao: "Feriado nacional.",
  },

  // =======================
  // OUTUBRO
  // =======================
  {
    id: 17,
    mes: "Outubro 2026",
    tipo: "feriado",
    inicio: "2026-10-12",
    duracao: 1,
    titulo: "Nossa Senhora Aparecida",
    descricao: "Feriado nacional.",
  },
  {
    id: 18,
    mes: "Outubro 2026",
    tipo: "academico",
    inicio: "2026-10-19",
    fim: "2026-10-23",
    duracao: 5,
    titulo: "Semana de Provas – 2026.2",
    descricao:
      "Avaliações parciais do semestre 2026.2.",
  },

  // =======================
  // NOVEMBRO
  // =======================
  {
    id: 19,
    mes: "Novembro 2026",
    tipo: "feriado",
    inicio: "2026-11-02",
    duracao: 1,
    titulo: "Finados",
    descricao: "Feriado nacional.",
  },
  {
    id: 20,
    mes: "Novembro 2026",
    tipo: "academico",
    inicio: "2026-11-23",
    fim: "2026-11-27",
    duracao: 5,
    titulo: "Semana de Provas Finais – 2026.2",
    descricao:
      "Avaliações finais do semestre 2026.2.",
  },

  // =======================
  // DEZEMBRO
  // =======================
  {
    id: 21,
    mes: "Dezembro 2026",
    tipo: "academico",
    inicio: "2026-12-04",
    duracao: 1,
    titulo: "Encerramento do Semestre – 2026.2",
    descricao:
      "Encerramento das atividades acadêmicas do ano letivo.",
  },
  {
    id: 22,
    mes: "Dezembro 2026",
    tipo: "ferias",
    inicio: "2026-12-05",
    fim: "2026-12-31",
    duracao: 27,
    titulo: "Recesso Acadêmico",
    descricao:
      "Recesso acadêmico de final de ano.",
  },
];
