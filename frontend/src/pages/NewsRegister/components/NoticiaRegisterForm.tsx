import { useState } from "react";
import { useAuth } from "../../../auth/hooks/useAuth";
import styles from "../NoticiaRegister.module.css";
import { registerNoticia } from "../../../api/service/news/registerNoticia";
import { allNoticiaTags } from "../constants/noticiaTags";

function NoticiaRegisterForm() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    titulo: "",
    conteudo: "",
    categoria: "",
    imagem_url: "",
    tags: [] as string[]
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function toggleTag(tag: string) {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    if (form.tags.length === 0) {
      setError("Selecione pelo menos uma tag.");
      return;
    }

    try {
      setLoading(true);
      await registerNoticia(form, token);
      alert("Notícia cadastrada com sucesso!");
      setForm({
        titulo: "",
        conteudo: "",
        categoria: "",
        imagem_url: "",
        tags: []
      });
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar notícia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.cardForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.floatingGroup}>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
          <label>Título</label>
        </div>

        <div className={styles.floatingGroup}>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="eventos">Eventos</option>
            <option value="oportunidades">Oportunidades</option>
          </select>
          <label>Categoria</label>
        </div>

        <div className={styles.floatingGroup}>
          <input
            name="imagem_url"
            value={form.imagem_url}
            onChange={handleChange}
          />
          <label>URL da Imagem</label>
        </div>

        <div className={styles.floatingGroup}>
          <textarea
            name="conteudo"
            rows={5}
            value={form.conteudo}
            onChange={handleChange}
            required
          />
          <label>Conteúdo</label>
        </div>

        <div className={styles.tagsWrapper}>
          <span className={styles.tagsLabel}>Tags</span>
          <div className={styles.tags}>
            {allNoticiaTags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={
                  form.tags.includes(tag)
                    ? styles.tagActive
                    : styles.tag
                }
              >
                {tag.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button className={styles.registerBtn} disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar Notícia"}
        </button>
      </form>
    </div>
  );
}

export default NoticiaRegisterForm;
