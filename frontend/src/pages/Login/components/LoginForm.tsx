import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import styles from "../Login.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoading, errorMessage } = useLogin();

  return (
    <>
      <h2 className={styles.title}>Fazer Login</h2>
      <h2 className={styles.subtitle}>Entre com suas credenciais institucionais</h2>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={isLoading}
          />
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button
          type="button"
          className={styles.loginBtn}
          onClick={() => handleLogin(email, password)}
          disabled={isLoading}
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
    </>
  );
}

export default LoginForm;
