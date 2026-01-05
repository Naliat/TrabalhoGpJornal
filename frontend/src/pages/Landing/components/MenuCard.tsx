import { useState } from "react";
import { Utensils } from "lucide-react";

import RuMenuModal from "./RuMenuModal";
import styles from "../Landing.module.css";
import { ruMenuMock } from "../../../mocks/RuMenu";

function MenuCard() {
  const [open, setOpen] = useState(false);
  const today = ruMenuMock[0];

  return (
    <>
      <div className={`${styles.infoCard} ${styles.menuCard}`}>
        <div className={styles.infoHeader}>
          <div className={styles.iconCircle}>
            <Utensils size={18} />
          </div>
          <div>
            <h3>Cardápio do RU</h3>
            <span className={styles.menuDate}>
              {today.weekday} · {today.date}
            </span>
          </div>
        </div>

        <div className={styles.menuGrid}>
          <div className={styles.menuSection}>
            <h4>Almoço</h4>
            <span className={styles.menuType}>Principal</span>
            <span>{today.lunch.main[0]}</span>
            <span className={styles.menuVeg}>
              Veg: {today.lunch.vegetarian}
            </span>
          </div>

          <div className={styles.menuSection}>
            <h4>Jantar</h4>
            <span className={styles.menuType}>Principal</span>
            <span>{today.dinner.main[0]}</span>
            <span className={styles.menuVeg}>
              Veg: {today.dinner.vegetarian}
            </span>
          </div>
        </div>

        <button
          className={styles.busMoreButton}
          onClick={() => setOpen(true)}
        >
          <Utensils size={14} />
          Ver todos os cardápios
        </button>
      </div>

      {open && <RuMenuModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default MenuCard;
