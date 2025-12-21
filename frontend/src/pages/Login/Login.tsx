import Logotype from "../../components/Logotype/Logotype";
import LoginForm from "./components/LoginForm";
import LoginInfoCard from "./components/LoginInfoCard";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logotype size={LOGO_SIZE_TYPE.LG} />
        </header>

        <main className={styles.cards}>
          <section className={`${styles.card} ${styles.cardInfo}`}>
            <LoginInfoCard />
          </section>

          <section className={`${styles.card} ${styles.cardForm}`}>
            <LoginForm />
          </section>
        </main>

        <footer className={styles.footer}>
          © 2025 Jornal UFC Quixadá. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

export default Login;
