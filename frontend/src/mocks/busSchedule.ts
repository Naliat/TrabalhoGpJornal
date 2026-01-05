export interface BusSchedule {
  id: number;
  local_saida: BusLocation;
  horario_saida: string;
  onibus: BusType;
}

export type BusLocation = "Rodoviaria" | "Campus";

export type BusType = "A" | "B";

export const busScheduleMock: BusSchedule[] = [
  // 🚌 Rodoviária
  {
    id: 1,
    local_saida: "Rodoviaria",
    horario_saida: "06:30",
    onibus: "A",
  },
  {
    id: 2,
    local_saida: "Rodoviaria",
    horario_saida: "07:00",
    onibus: "B",
  },
  {
    id: 3,
    local_saida: "Rodoviaria",
    horario_saida: "07:30",
    onibus: "A",
  },
  {
    id: 4,
    local_saida: "Rodoviaria",
    horario_saida: "08:00",
    onibus: "B",
  },
  {
    id: 5,
    local_saida: "Rodoviaria",
    horario_saida: "08:30",
    onibus: "A",
  },
  {
    id: 6,
    local_saida: "Rodoviaria",
    horario_saida: "09:00",
    onibus: "B",
  },
  {
    id: 7,
    local_saida: "Rodoviaria",
    horario_saida: "10:00",
    onibus: "A",
  },
  {
    id: 8,
    local_saida: "Rodoviaria",
    horario_saida: "11:00",
    onibus: "B",
  },
  {
    id: 9,
    local_saida: "Rodoviaria",
    horario_saida: "12:00",
    onibus: "A",
  },
  {
    id: 10,
    local_saida: "Rodoviaria",
    horario_saida: "13:00",
    onibus: "B",
  },

  // 🚌 Campus
  {
    id: 11,
    local_saida: "Campus",
    horario_saida: "07:15",
    onibus: "A",
  },
  {
    id: 12,
    local_saida: "Campus",
    horario_saida: "07:45",
    onibus: "B",
  },
  {
    id: 13,
    local_saida: "Campus",
    horario_saida: "08:15",
    onibus: "A",
  },
  {
    id: 14,
    local_saida: "Campus",
    horario_saida: "09:15",
    onibus: "B",
  },
  {
    id: 15,
    local_saida: "Campus",
    horario_saida: "10:15",
    onibus: "A",
  },
  {
    id: 16,
    local_saida: "Campus",
    horario_saida: "11:15",
    onibus: "B",
  },
  {
    id: 17,
    local_saida: "Campus",
    horario_saida: "12:15",
    onibus: "A",
  },
  {
    id: 18,
    local_saida: "Campus",
    horario_saida: "13:15",
    onibus: "B",
  },
  {
    id: 19,
    local_saida: "Campus",
    horario_saida: "14:15",
    onibus: "A",
  },
  {
    id: 20,
    local_saida: "Campus",
    horario_saida: "15:15",
    onibus: "B",
  },
];
