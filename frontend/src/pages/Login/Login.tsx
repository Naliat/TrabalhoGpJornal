import Logotype from "../../components/Logotype/Logotype";
import LoginForm from "./components/LoginForm";
import LoginInfoCard from "./components/LoginInfoCard";
import SimpleFooter from "../../components/Footer/SimpleFooter";

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

        <SimpleFooter />
      </div>
    </div>
  );
}

export default Login;
