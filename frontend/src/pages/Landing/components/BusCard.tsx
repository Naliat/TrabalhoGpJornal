import { useState } from "react";
import { Bus, Clock } from "lucide-react";

import BusScheduleModal from "./BusScheduleModal";

import styles from "../Landing.module.css";

function BusCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${styles.infoCard} ${styles.busCard}`}>
        <div className={styles.infoHeader}>
          <div className={styles.iconCircle}>
            <Bus size={18} />
          </div>
          <h3>Próximo Ônibus</h3>
        </div>

        <div className={styles.busSchedule}>
          <div className={styles.busHeaderRow}>
            <span>Rodoviária</span>
            <span>Campus</span>
          </div>

          <div className={styles.busTimeRow}>
            <strong>12:50</strong>
            <strong>13:15</strong>
          </div>
        </div>

        <button
          className={styles.busMoreButton}
          onClick={() => setOpen(true)}
        >
          <Clock size={14} />
          Ver todos os horários
        </button>
      </div>

      {open && <BusScheduleModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default BusCard;
