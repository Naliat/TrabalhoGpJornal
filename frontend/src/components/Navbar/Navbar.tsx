import { Menu, Search } from "lucide-react";
import styles from "./Navbar.module.css";

import logo from "../../assets/logo_ufc_quixada.png";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/login");
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn}>
          <Menu size={26} />
        </button>
      </div>

      <div className={styles.center}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
          <Search size={18} className={styles.searchIcon} />
        </div>

        <div className={styles.loginArea}>
          <button className={styles.loginBtn} onClick={redirectToLogin}>
            Entrar
          </button>
          <img src={profile} alt="Profile" className={styles.profileImg} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
