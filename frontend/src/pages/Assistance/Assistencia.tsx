import { 
  ChevronLeft, ChevronRight, Users, Heart, Apple, 
  DollarSign, FileText, ClipboardList, BookOpen, 
  GraduationCap, Mail, Phone, MapPin, ExternalLink 
} from "lucide-react";
import styles from "./Assistencia.module.css";

const Assistencia = () => {
  return (
    <div className={styles.container}>
      
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <button className={styles.backButton}>← Voltar para Home</button>
          <h1>Assistência Estudantil – PRAE</h1>
          <p>
            Centralizamos serviços, auxílios e ações de apoio à permanência estudantil. 
            Nossa missão é garantir condições para que você possa desenvolver 
            plenamente sua formação acadêmica e pessoal.
          </p>
        </div>
      </section>

     
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Users className={styles.sectionIcon} />
          <h2>Apoio ao Estudante</h2>
        </div>
        <p className={styles.sectionSubtitle}>Serviços especializados para garantir seu bem-estar e permanência na universidade.</p>
        
        <div className={styles.carouselWrapper}>
          <div className={styles.grid}>
            <div className={styles.whiteCard}>
              <Users color="#3b82f6" />
              <h3>Atendimento Social</h3>
              <p>Acompanhamento e orientação aos estudantes em situação de vulnerabilidade socioeconômica.</p>
              <a href="#">Saiba mais <ExternalLink size={14} /></a>
            </div>
            <div className={styles.whiteCard}>
              <Heart color="#3b82f6" />
              <h3>Serviço Social</h3>
              <p>Profissionais especializados em assistência social para orientar sobre direitos e auxílios.</p>
              <a href="#">Saiba mais <ExternalLink size={14} /></a>
            </div>
            <div className={styles.whiteCard}>
              <Apple color="#3b82f6" />
              <h3>Nutrição</h3>
              <p>Atendimento nutricional e orientações sobre alimentação saudável e RU.</p>
              <a href="#">Saiba mais <ExternalLink size={14} /></a>
            </div>
          </div>
          <div className={styles.carouselControls}>
            <button><ChevronLeft /></button>
            <div className={styles.dots}><span className={styles.activeDot}></span><span></span></div>
            <button><ChevronRight /></button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <DollarSign className={styles.sectionIcon} />
          <h2>Bolsas, Auxílios e Oportunidades</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.blueLightCard}>
            <DollarSign color="#0284c7" />
            <h3>Bolsas e Auxílios</h3>
            <p>Programas de auxílio financeiro para estudantes em situação de vulnerabilidade: moradia, alimentação...</p>
            <button className={styles.blueButton}>Acessar</button>
          </div>
          <div className={styles.blueLightCard}>
            <FileText color="#0284c7" />
            <h3>Editais</h3>
            <p>Consulte os editais vigentes para inscrição em programas de bolsas e auxílios da assistência.</p>
            <button className={styles.blueButton}>Acessar</button>
          </div>
          <div className={styles.blueLightCard}>
            <ClipboardList color="#0284c7" />
            <h3>Formulários</h3>
            <p>Acesse os formulários necessários para solicitação de bolsas, auxílios e outros serviços.</p>
            <button className={styles.blueButton}>Acessar</button>
          </div>
        </div>
      </section>

       
      <div className={styles.alertBanner}>
        <div className={styles.alertContent}>
          <ClipboardList color="#d97706" />
          <div>
            <strong>Editais em Aberto</strong>
            <p>Há editais abertos para solicitação de bolsas de auxílio moradia, alimentação e transporte. Inscrições até 31/01/2026.</p>
            <a href="#">Ver editais disponíveis ↗</a>
          </div>
        </div>
      </div>

      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <BookOpen className={styles.sectionIcon} />
          <h2>Vida Acadêmica</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.outlineCard}>
            <BookOpen color="#9333ea" />
            <h3>Guia do Estudante</h3>
            <p>Manual completo com informações essenciais sobre a vida acadêmica e direitos.</p>
            <a href="#">Acessar ↗</a>
          </div>
          <div className={styles.outlineCard}>
            <GraduationCap color="#9333ea" />
            <h3>Matrícula</h3>
            <p>Informações sobre processos de matrícula, renovação e trancamento.</p>
            <a href="#">Acessar ↗</a>
          </div>
        </div>
      </section>

      
      <section className={styles.blueFooter}>
        <h2>Entre em Contato</h2>
        <p>Os profissionais estarão disponíveis para atendê-lo e esclarecer suas dúvidas.</p>
        
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <Mail />
            <div>
              <strong>Email</strong>
              <p>prae@quixada.ufc.br</p>
              <span>Resposta em até 48h úteis</span>
            </div>
          </div>
          <div className={styles.contactCard}>
            <Phone />
            <div>
              <strong>Telefone</strong>
              <p>(88) 3366-1200</p>
              <span>Seg a Sex: 8h às 17h</span>
            </div>
          </div>
          <div className={styles.fullContactCard}>
            <MapPin />
            <div>
              <strong>Atendimento Presencial</strong>
              <p>Bloco Administrativo, Sala 105 – Campus Quixadá</p>
              <span>Segunda a Sexta: 8h às 12h e 14h às 17h</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assistencia;