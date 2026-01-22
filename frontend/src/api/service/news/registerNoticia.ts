import ENV from "../../../config/envConfig";
import type { NoticiaCreateDTO } from "../../../pages/NewsRegister/types/NoticiaCreateDTO";
import type { NoticiaResponseDTO } from "../../../pages/NewsRegister/types/NoticiaResponseDTO";

export async function registerNoticia(
  data: NoticiaCreateDTO,
  token: string
): Promise<NoticiaResponseDTO> {
  const url = `${ENV.API_BASE_URL}/noticias/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar a notícia no servidor.");
  }

  return await response.json();
}
