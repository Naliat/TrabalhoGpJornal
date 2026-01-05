export interface RuMenu {
  id: number;
  date: string;
  weekday: string;
  lunch: {
    main: string[];
    vegetarian: string;
    juice: string;
  };
  dinner: {
    main: string[];
    vegetarian: string;
    juice: string;
  };
}

export const ruMenuMock: RuMenu[] = [
  {
    id: 1,
    date: "2026-01-05",
    weekday: "Segunda-feira",
    lunch: {
      main: ["Churrasco bovino na chapa", "Salpicão de frango cremoso"],
      vegetarian: "Falafel de ervilha (contém glúten)",
      juice: "Laranja",
    },
    dinner: {
      main: ["Ensopado de carne com legumes", "Isca de frango"],
      vegetarian: "Lentilha ao molho de tomate",
      juice: "Uva",
    },
  },
  {
    id: 2,
    date: "2026-01-06",
    weekday: "Terça-feira",
    lunch: {
      main: ["Frango grelhado", "Arroz carreteiro"],
      vegetarian: "Hambúrguer de grão-de-bico",
      juice: "Maracujá",
    },
    dinner: {
      main: ["Carne moída com legumes", "Omelete recheado"],
      vegetarian: "Abobrinha recheada",
      juice: "Acerola",
    },
  },
  {
    id: 3,
    date: "2026-01-07",
    weekday: "Quarta-feira",
    lunch: {
      main: ["Feijoada", "Linguiça acebolada"],
      vegetarian: "Feijoada vegetariana",
      juice: "Limão",
    },
    dinner: {
      main: ["Arroz, feijão e frango assado"],
      vegetarian: "Quibe de abóbora",
      juice: "Caju",
    },
  },
];
