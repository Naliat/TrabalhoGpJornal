import { useState } from "react";
import { useAuth } from "../../../auth/hooks/useAuth";
import styles from "../NoticiaRegister.module.css";
import { registerNoticia } from "../../../api/service/news/registerNoticia";
import { academicTags, opportunityTags } from "../constants/noticiaTags";

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

  function handleTagToggle(tag: string) {
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
      setError(err.message || "Erro ao cadastrar notícia");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.cardForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.floatingGroup}>
          <input name="titulo" value={form.titulo} onChange={handleChange} required />
          <label>Título</label>
        </div>

        <div className={styles.floatingGroup}>
          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="oportunidade">Oportunidade</option>
            <option value="academico">Acadêmico</option>
          </select>
          <label>Categoria</label>
        </div>

        <div className={styles.floatingGroup}>
          <input name="imagem_url" value={form.imagem_url} onChange={handleChange} />
          <label>URL da Imagem</label>
        </div>

        <div className={styles.floatingGroup}>
          <textarea
            name="conteudo"
            value={form.conteudo}
            onChange={handleChange}
            rows={4}
            required
          />
          <label>Conteúdo</label>
        </div>

        <div className={styles.tags}>
          {(form.categoria === "oportunidade"
            ? opportunityTags
            : academicTags
          ).map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={form.tags.includes(tag) ? styles.tagActive : styles.tag}
            >
              {tag}
            </button>
          ))}
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
