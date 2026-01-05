import { useMemo, useState } from "react";
import { X } from "lucide-react";

import styles from "../Landing.module.css";
import { ruMenuMock } from "../../../mocks/RuMenu";

const ITEMS_PER_PAGE = 1;

interface Props {
  onClose: () => void;
}

function RuMenuModal({ onClose }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ruMenuMock.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    return ruMenuMock.slice(page - 1, page);
  }, [page]);

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${styles.ruModal}`}>
        <div className={styles.modalHeader}>
          <div>
            <h3>Cardápio do RU</h3>
            <p className={styles.modalSubtitle}>
              Almoço e jantar por dia
            </p>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.ruModalContent}>
          {paginatedData.map((menu) => (
            <div key={menu.id} className={styles.ruMenuDay}>
              <div className={styles.ruMenuHeader}>
                <strong>{menu.weekday}</strong>
                <span>{menu.date}</span>
              </div>

              <div className={styles.ruMeal}>
                <h4>Almoço</h4>
                {menu.lunch.main.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <span className={styles.menuVeg}>
                  Veg: {menu.lunch.vegetarian}
                </span>
                <span className={styles.menuJuice}>
                  Suco: {menu.lunch.juice}
                </span>
              </div>

              <div className={styles.ruMeal}>
                <h4>Jantar</h4>
                {menu.dinner.main.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <span className={styles.menuVeg}>
                  Veg: {menu.dinner.vegetarian}
                </span>
                <span className={styles.menuJuice}>
                  Suco: {menu.dinner.juice}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.modalPagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default RuMenuModal;
