import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";
import type { LogoTypeProps } from "./types/LogotypeProps";

import styles from "./Logotype.module.css";
import logo from "../../assets/logo-jornal.png";

function Logotype({ size = LOGO_SIZE_TYPE.SM }: LogoTypeProps) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <img
        src={logo}
        alt="Logo do Jornal da UFC Campus Quixadá"
        className={styles.logo}
      />

      <p className={styles.text}>
        <span className={styles.title}>Jornal UFC</span>
        <span className={styles.subtitle}>Quixadá</span>
      </p>
    </div>
  );
}

export default Logotype;
