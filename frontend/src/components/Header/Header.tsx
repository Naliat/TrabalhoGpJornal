import { Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import Logotype from "../Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/login");
  }

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <Logotype size={LOGO_SIZE_TYPE.SM} />

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
            <NavLink to="/" end className={getNavLinkClass}>
              Início
            </NavLink>
          </li>

          <li>
            <NavLink to="/oportunidades" className={getNavLinkClass}>
              Oportunidades
            </NavLink>
          </li>

          <li>
            <NavLink to="/eventos" className={getNavLinkClass}>
              Eventos
            </NavLink>
          </li>

          <li>
            <NavLink to="/projetos" className={getNavLinkClass}>
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

export default Header;
