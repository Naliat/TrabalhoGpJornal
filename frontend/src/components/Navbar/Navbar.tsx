import { Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logotype from "../Logotype/Logotype";

function Navbar() {
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/login");
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Logotype size="sm" />
      </div>

      <div className={styles.center}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar editais, moradia, eventos..."
            className={styles.searchInput}
          />
          <Search size={18} className={styles.searchIcon} />
        </div>
      </div>

      <nav className={styles.right}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/" end className={styles.navLink}>
              Início
            </NavLink>
          </li>

          <li>
            <NavLink to="/oportunidades" className={styles.navLink}>
              Oportunidades
            </NavLink>
          </li>

          <li>
            <NavLink to="/eventos" className={styles.navLink}>
              Eventos
            </NavLink>
          </li>

          <li>
            <NavLink to="/projetos" className={styles.navLink}>
              Projetos
            </NavLink>
          </li>
        </ul>

        <div className={styles.loginArea}>
          <button className={styles.loginBtn} onClick={redirectToLogin}>
            Entrar
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
