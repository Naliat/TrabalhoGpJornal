export interface NoticiaResponseDTO {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
  tags: string[];
  imagem_url: string;
  data_publicacao: string;
}
