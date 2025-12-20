export const USER_TYPE = {
  TEACHER: "Professor",
  STUDENT: "Aluno",
  ADMIN: "Administrador"
} as const;

export type UserType = typeof USER_TYPE[keyof typeof USER_TYPE];
