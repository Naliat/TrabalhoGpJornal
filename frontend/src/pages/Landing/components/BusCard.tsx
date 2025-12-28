import { Bus } from "lucide-react";
import styles from "../Landing.module.css";

function BusCard() {
  return (
    <div className={`${styles.infoCard} ${styles.busCard}`}>
      <div className={styles.infoHeader}>
        <div className={styles.iconCircle}>
          <Bus size={18} />
        </div>
        <h3>Próximo Ônibus</h3>
      </div>

      <div className={styles.busSchedule}>
        <div className={styles.busHeaderRow}>
          <span>Saindo da Rodoviária</span>
          <span>Saindo do Campus</span>
        </div>

        <div className={styles.busTimeRow}>
          <strong>12h50min</strong>
          <strong>13h15min</strong>
        </div>
      </div>
    </div>
  );
}

export default BusCard;
