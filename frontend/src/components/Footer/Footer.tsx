import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>Jornal UFC Quixadá</h4>
            <p>
              Portal de notícias da Universidade Federal do Ceará, Campus
              Quixadá.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Navegação</h4>
            <ul>
              <li>Início</li>
              <li>Oportunidades</li>
              <li>Eventos</li>
              <li>Assistência Estudantil</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>UFC Quixadá</h4>
            <ul>
              <li>Site Oficial</li>
              <li>Portal do Aluno</li>
              <li>Biblioteca</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Contato</h4>
            <ul>
              <li>Email: contato@quixada.ufc.br</li>
              <li>Telefone: (88) 3366-1000</li>
              <li>Rua dos Pombinhos, 2323</li>
              <li>Quixadá - CE</li>
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>© 2026 Jornal UFC Quixadá. Todos os direitos reservados.</span>

          <div className={styles.bottomLinks}>
            <span>Privacidade</span>
            <span>Termos</span>
            <span>Acessibilidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
