import { LogIn, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import Logotype from "../Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

import { useAuth } from "../../auth/hooks/useAuth";

import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useAuth();

  function redirectToLogin() {
    navigate("/login");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logotype size={LOGO_SIZE_TYPE.SM} />
        </div>

        <nav className={styles.right}>
          {/* 🔓 USUÁRIO NÃO LOGADO */}
          {!loading && !isAuthenticated && (
            <>
              <ul className={styles.menu}>
                <li>
                  <NavLink to="/" end className={getNavLinkClass}>
                    Início
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/oportunidades"
                    className={getNavLinkClass}
                  >
                    Oportunidades
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/eventos"
                    className={getNavLinkClass}
                  >
                    Eventos
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/calendario/academico"
                    className={getNavLinkClass}
                  >
                    Calendário
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/assistencia"
                    className={getNavLinkClass}
                  >
                    Assistência
                  </NavLink>
                </li>
              </ul>

              <div className={styles.loginArea}>
                <button
                  className={styles.loginBtn}
                  onClick={redirectToLogin}
                >
                  <LogIn size={16} />
                  Entrar
                </button>
              </div>
            </>
          )}

          {/* 🔐 USUÁRIO LOGADO → SÓ LOGOUT */}
          {!loading && isAuthenticated && (
            <div className={styles.loginArea}>
              <button
                className={styles.loginBtn}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
