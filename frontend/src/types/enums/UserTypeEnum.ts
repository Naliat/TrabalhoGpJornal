export const USER_TYPE = {
  TEACHER: "PROFESSOR",
  STUDENT: "ALUNO",
  ADMIN: "ADM"
} as const;

export type UserType = typeof USER_TYPE[keyof typeof USER_TYPE];
