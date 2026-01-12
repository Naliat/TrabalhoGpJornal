import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import styles from "./NewsletterSubscribe.module.css";

function NewsletterSubscribe() {
  return (
    <Link
      to="/newsletter"
      className={styles.floatingButton}
      aria-label="Ir para cadastro da newsletter"
    >
      <div className={styles.icon}>
        <Mail size={20} />
      </div>

      <div className={styles.text}>
        <strong>Newsletter</strong>
        <span>Receba novidades</span>
      </div>
    </Link>
  );
}

export default NewsletterSubscribe;
