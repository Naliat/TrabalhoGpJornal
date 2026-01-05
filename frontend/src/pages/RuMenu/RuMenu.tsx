import { ArrowLeft, Utensils, Pencil, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./RuMenu.module.css";
import { ruMenuMock } from "../../mocks/RuMenu";

const ITEMS_PER_PAGE = 2;

function RuMenu() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ruMenuMock.length / ITEMS_PER_PAGE);

  const paginatedData = ruMenuMock.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.backHome}>
        <Link to="/">
          <ArrowLeft size={14} />
          Voltar para Home
        </Link>
      </div>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Cardápio do RU</h1>
          <p className={styles.subtitle}>
            Visualize e gerencie o cardápio diário do restaurante universitário
          </p>
        </div>

        <button
          className={styles.createButton}
          onClick={() => navigate("/ru/cardapio/novo")}
        >
          <Plus size={16} />
          Novo Cardápio
        </button>
      </div>

      <div className={styles.calendarList}>
        {paginatedData.map((menu) => (
          <div key={menu.id} className={styles.dayCard}>
            <div className={styles.dayHeader}>
              <div className={styles.dayInfo}>
                <div className={styles.iconCircle}>
                  <Utensils size={18} />
                </div>

                <div>
                  <strong>{menu.weekday}</strong>
                  <span>{menu.date}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() =>
                    navigate(`/ru/cardapio/editar/${menu.id}`)
                  }
                >
                  <Pencil size={14} />
                  Editar
                </button>

                <button className={styles.deleteButton}>
                  <Trash2 size={14} />
                  Excluir
                </button>
              </div>
            </div>

            <div className={styles.menuGrid}>
              <div className={styles.menuSection}>
                <h4>Almoço</h4>

                <span className={styles.menuType}>Prato principal</span>
                {menu.lunch.main.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}

                <span className={styles.menuVeg}>Vegetariano</span>
                <span>{menu.lunch.vegetarian}</span>

                <span className={styles.menuJuice}>
                  Suco: {menu.lunch.juice}
                </span>
              </div>

              <div className={styles.menuSection}>
                <h4>Jantar</h4>

                <span className={styles.menuType}>Prato principal</span>
                {menu.dinner.main.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}

                <span className={styles.menuVeg}>Vegetariano</span>
                <span>{menu.dinner.vegetarian}</span>

                <span className={styles.menuJuice}>
                  Suco: {menu.dinner.juice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default RuMenu;
