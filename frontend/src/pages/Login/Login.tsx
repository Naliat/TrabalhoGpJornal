import { Link } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";

import { useState } from "react";

import styles from "./Login.module.css";
import Logotype from "../../components/Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    handleLogin,
    isLoading,
    errorMessage,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Logotype size={LOGO_SIZE_TYPE.LG} />
        
        <h2 className={styles.title}>Entrar</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            className={styles.loginBtn}
            disabled={isLoading}
            onClick={() => handleLogin(email, password)}
          >
            {isLoading ? "Aguarde..." : "Entrar"}
          </button>
        </form>

        <p className={styles.registerLink}>
          Não tem conta? <Link to="/registro">Registre-se</Link>
        </p>

        <p className={styles.backHome}>
          <Link to="/">← Voltar para a página inicial</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
