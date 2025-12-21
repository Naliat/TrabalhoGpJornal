import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <h4>Jornal UFC Quixadá</h4>
          <p>Informação acadêmica centralizada para a comunidade universitária.</p>
        </div>

        <div>
          <h4>Links</h4>
          <ul>
            <li>Início</li>
            <li>Sobre</li>
            <li>Contato</li>
          </ul>
        </div>

        <div>
          <h4>Institucional</h4>
          <ul>
            <li>Editais</li>
            <li>Eventos</li>
            <li>Projetos</li>
          </ul>
        </div>
      </div>

      <span className={styles.copy}>
        © 2025 Jornal UFC Quixadá. Todos os direitos reservados.
      </span>
    </footer>
  );
}

export default Footer;
