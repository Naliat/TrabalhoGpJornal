import styles from "./Login.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={logo} alt="Logo" className={styles.logo} />

                <h2 className={styles.title}>Entrar</h2>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" required />
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        Entrar
                    </button>
                </form>

                <p className={styles.registerLink}>
                    Não tem conta? <Link to="/register">Registre-se</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
