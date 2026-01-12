import Logotype from "../../components/Logotype/Logotype";
import RegisterForm from "./components/RegisterForm";

import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

import styles from "./Register.module.css";
import SimpleFooter from "../../components/Footer/SimpleFooter";

function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logotype size={LOGO_SIZE_TYPE.LG} />
        </header>

        <div className={styles.cards}>
          <div className={styles.text}>
            <h1 className={styles.title}>Criar conta</h1>
            <p className={styles.subtitle}>
              Preencha os dados para realizar seu cadastro
            </p>
          </div>

          <RegisterForm />
        </div>

        <SimpleFooter />
      </div>
    </div>
  );
}

export default Register;
