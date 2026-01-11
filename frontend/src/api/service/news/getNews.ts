import ENV from "../../../config/envConfig";

export async function getNews(category?: string) {
    
    const query = category ? `?categoria=${encodeURIComponent(category)}` : "";
    const url = `${ENV.API_BASE_URL}/noticias/${query}`;

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar notícias do servidor.");
    }

    return await response.json();
}