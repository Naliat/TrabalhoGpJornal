import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Newsletter.module.css";
import SimpleFooter from "../../components/Footer/SimpleFooter";
import Logotype from "../../components/Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [acceptAllNews, setAcceptAllNews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubscribe() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Inscrição realizada com sucesso!");
      setEmail("");
      setAcceptAllNews(false);
    }, 1200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logotype size={LOGO_SIZE_TYPE.LG} />
        </header>

        <main className={styles.main}>
          <div className={styles.cards}>
            <div className={styles.text}>
              <h1 className={styles.title}>Registre-se na newsletter</h1>
              <p className={styles.subtitle}>
                Receba novidades, atualizações e conteúdos exclusivos no seu e-mail
              </p>
            </div>

            <div className={styles.cardForm}>
              <form className={styles.form}>
                <div className={styles.floatingGroup}>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="nome.sobrenome@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <label htmlFor="newsletter-email">Email</label>
                </div>

                <label className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    checked={acceptAllNews}
                    onChange={(e) => setAcceptAllNews(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span>
                    Desejo receber todas as notícias do Jornal da UFC Quixadá
                  </span>
                </label>

                {successMessage && (
                  <p className={styles.successMessage}>{successMessage}</p>
                )}

                <button
                  type="button"
                  className={styles.subscribeBtn}
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? "Aguarde..." : "Inscrever-se"}
                </button>
              </form>

              <p className={styles.backHome}>
                <Link to="/">← Voltar para a página inicial</Link>
              </p>
            </div>
          </div>
        </main>

        <SimpleFooter />
      </div>
    </div>
  );
}

export default Newsletter;
