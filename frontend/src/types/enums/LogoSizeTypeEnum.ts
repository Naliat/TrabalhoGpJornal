export const LOGO_SIZE_TYPE = {
  SM: "sm",
  MD: "md",
  LG: "lg"
} as const;

export type LogoSizeType = typeof LOGO_SIZE_TYPE[keyof typeof LOGO_SIZE_TYPE];
