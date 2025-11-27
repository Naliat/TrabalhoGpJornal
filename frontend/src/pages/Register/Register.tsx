import styles from "./Register.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <h2 className={styles.title}>Criar conta</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome completo</label>
            <input type="text" placeholder="Seu nome" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Seu email" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input type="password" placeholder="Crie uma senha" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar senha</label>
            <input type="password" placeholder="Repita a senha" required />
          </div>

          <button type="submit" className={styles.registerBtn}>
            Registrar
          </button>
        </form>

        <p className={styles.loginRedirect}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
