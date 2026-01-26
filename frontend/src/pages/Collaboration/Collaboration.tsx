import { useState, useEffect } from "react";
import { MessageSquare, Github, Send, AlertCircle } from "lucide-react";
import styles from "./Collaboration.module.css";

function Collaboration() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/colaboracoes";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(API_URL + "/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updated = await fetch(API_URL).then(res => res.json());
        setSuggestions(updated);
        setFormData({ name: "", text: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Colabore com o Jornal</h1>
          <p>Sua ideia pode ajudar a melhorar a comunicação na UFC Quixadá.</p>
        </header>

        <section className={styles.githubSection}>
          <div className={styles.card}>
            <Github size={48} color="#0095da" />
            <h3>Contribuição Técnica</h3>
            <p>Encontrou um bug ou tem uma sugestão de código? Abra uma Issue em nosso repositório oficial.</p>
            <a href="https://github.com/Naliat/TrabalhoGpJornal" className={styles.githubBtn}>
              <AlertCircle size={18} /> Reportar no GitHub
            </a>
          </div>
        </section>

        <section className={styles.forumSection}>
          <div className={styles.formCard}>
            <h3><MessageSquare size={22} /> Deixe sua Sugestão</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <textarea
                placeholder="Sua sugestão..."
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              />
              <button type="submit" className={styles.sendBtn} disabled={loading}>
                {loading ? "Enviando..." : <><Send size={18} /> Enviar Sugestão</>}
              </button>
            </form>
          </div>

          <div className={styles.feed}>
            <h3>Sugestões da Comunidade</h3>
            {suggestions.map((item) => (
              <div key={item._id} className={styles.suggestionCard}>
                <div className={styles.cardHeader}>
                  <strong>{item.name}</strong>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Collaboration;