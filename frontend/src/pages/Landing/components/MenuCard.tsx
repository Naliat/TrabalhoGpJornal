import { Utensils } from "lucide-react";
import styles from "../Landing.module.css";

function MenuCard() {
  return (
    <div className={`${styles.infoCard} ${styles.menuCard}`}>
      <div className={styles.infoHeader}>
        <div className={styles.iconCircle}>
          <Utensils size={18} />
        </div>
        <div>
          <h3>Cardápio de Hoje</h3>
          <span className={styles.menuDate}>
            Segunda-feira · 05/01/2026
          </span>
        </div>
      </div>

      <div className={styles.menuGrid}>
        <div className={styles.menuSection}>
          <h4>Almoço</h4>

          <span className={styles.menuType}>Prato Principal</span>
          <span>Churrasco bovino na chapa</span>
          <span>Salpicão de frango cremoso</span>

          <span className={styles.menuVeg}>Vegetariano</span>
          <span>Falafel de ervilha (contém glúten)</span>

          <span className={styles.menuJuice}>Suco: Laranja</span>
        </div>

        <div className={styles.menuSection}>
          <h4>Jantar</h4>

          <span className={styles.menuType}>Prato Principal</span>
          <span>Ensopado de carne com legumes</span>
          <span>Isca de frango</span>

          <span className={styles.menuVeg}>Vegetariano</span>
          <span>Lentilha ao molho de tomate</span>

          <span className={styles.menuJuice}>Suco: Uva</span>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
