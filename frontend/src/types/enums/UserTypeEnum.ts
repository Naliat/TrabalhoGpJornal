export const USER_TYPE = {
  TEACHER: "Professor",
  STUDENT: "Estudante",
  ADMIN: "Admin",
  OTHERS: "Outros",
} as const;

export type UserType = typeof USER_TYPE[keyof typeof USER_TYPE];
