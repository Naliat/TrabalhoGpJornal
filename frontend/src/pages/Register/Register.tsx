import { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link } from "react-router-dom";
import { useRegister } from "./hooks/useRegister";
import { USER_TYPE, type UserType } from "../../types/enums/UserTypeEnum";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<UserType>(USER_TYPE.STUDENT);

  const {
    handleRegister,
    isLoading,
    errorMessage,
  } = useRegister();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <h2 className={styles.title}>Criar conta</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

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
            <label>Tipo de usuário</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
              disabled={isLoading}
              required
            >
              {Object.values(USER_TYPE).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className={styles.registerBtn}
            disabled={isLoading}
            onClick={() =>
              handleRegister(
                username,
                email,
                password,
                confirmPassword,
                userType
              )
            }
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p className={styles.loginRedirect}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>

        <p className={styles.backHome}>
          <Link to="/">← Voltar para a página inicial</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
