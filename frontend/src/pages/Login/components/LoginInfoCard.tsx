import InfoCard from "./InforCard";
import img1 from "../../../assets/img-teste.jpg";
import styles from "../Login.module.css";

function LoginInfoCard() {
  return (
    <>
      <div className={styles.infoList}>
        <InfoCard
          image={img1}
          text="Acesse oportunidades acadêmicas, editais e projetos em um só lugar."
          alt="Acesso a oportunidades"
        />

        <InfoCard
          image={img1}
          text="Receba informações atualizadas sobre eventos, bolsas e programas."
          alt="Informações atualizadas"
        />

        <InfoCard
          image={img1}
          text="Centralize sua vida acadêmica com praticidade e organização."
          alt="Organização acadêmica"
        />
      </div>

      <hr />

      <div className={styles.infoFooter}>
        <p>
          <span>Fique informado:</span> acompanhe novidades importantes da universidade.
        </p>

        <p>
          <span>Participe:</span> não perca prazos, eventos e oportunidades.
        </p>
      </div>
    </>
  );
}

export default LoginInfoCard;
