import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useLogin } from "../hooks/useLogin";

import styles from "../Login.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, isLoading, errorMessage } = useLogin();

  return (
    <>
      <form className={styles.form}>
        <div className={styles.floatingGroup}>
          <input
            id="email"
            type="email"
            placeholder="nome.sobrenome@sigla.ufc.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className={styles.floatingGroup}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <label htmlFor="password">Senha</label>

          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className={styles.forgotPasswordWrapper}>
          <Link to="/senha/recuperar" className={styles.forgotPassword}>
            Esqueceu a senha?
          </Link>
        </div>

        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}

        <button
          type="button"
          className={styles.loginBtn}
          onClick={() => handleLogin(email, password)}
          disabled={isLoading}
        >
          {isLoading ? "Aguarde..." : "Entrar"}
        </button>
      </form>

      <p className={styles.backHome}>
        <Link to="/">← Voltar para a página inicial</Link>
      </p>
    </>
  );
}

export default LoginForm;
