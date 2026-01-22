import ENV from "../../../config/envConfig";
import type { NoticiaResponseDTO } from "../../../pages/NewsRegister/types/NoticiaResponseDTO";

export async function getNoticiaById(
  noticiaId: string,
): Promise<NoticiaResponseDTO> {
  const url = `${ENV.API_BASE_URL}/noticias/${noticiaId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
     throw new Error("Erro ao buscar a notícia no servidor.");
  }

  return await response.json();
}
