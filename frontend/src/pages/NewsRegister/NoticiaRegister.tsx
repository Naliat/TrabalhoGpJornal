import Logotype from "../../components/Logotype/Logotype";
import NoticiaRegisterForm from "./components/NoticiaRegisterForm";
import SimpleFooter from "../../components/Footer/SimpleFooter";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";
import styles from "./NoticiaRegister.module.css";

function NoticiaRegister() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logotype size={LOGO_SIZE_TYPE.LG} />
        </header>

        <div className={styles.cards}>
          <div className={styles.text}>
            <h1 className={styles.title}>Cadastrar Notícia</h1>
            <p className={styles.subtitle}>
              Preencha os dados da nova notícia
            </p>
          </div>

          <NoticiaRegisterForm />
        </div>

        <SimpleFooter />
      </div>
    </div>
  );
}

export default NoticiaRegister;
