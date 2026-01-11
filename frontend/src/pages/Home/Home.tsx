import { UserPlus, Users, GraduationCap, FilePlus, Utensils, Bus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { USER_TYPE } from "../../types/enums/UserTypeEnum";
import styles from "./Home.module.css";
import SimpleFooter from "../../components/Footer/SimpleFooter";

function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <p>Carregando...</p>;
  if (!isAuthenticated || !user) return <p>Você não está autenticado.</p>;

  
  const role = (user as any).user_type || (user as any).userType;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {user.username}</h1>

      {role === USER_TYPE.ADMIN && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Administrador</h2>
          <div className={styles.actionGrid}>
            <Link to="/usuario/cadastro" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><UserPlus size={22} /></div>
                <strong>Criar Usuário</strong>
              </div>
            </Link>
            <Link to="/usuarios" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><Users size={22} /></div>
                <strong>Visualizar Usuários</strong>
              </div>
            </Link>
            <Link to="/ru/cardapio" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><Utensils size={22} /></div>
                <strong>Gerenciar Cardápio</strong>
              </div>
            </Link>
          </div>
        </section>
      )}

      {role === USER_TYPE.TEACHER && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Professor</h2>
          <div className={styles.actionGrid}>
            <Link to="/usuario/cadastro" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><GraduationCap size={22} /></div>
                <strong>Cadastrar Aluno</strong>
              </div>
            </Link>
            <Link to="/alunos" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><Users size={22} /></div>
                <strong>Visualizar Alunos</strong>
              </div>
            </Link>
          </div>
        </section>
      )}

      {role === USER_TYPE.STUDENT && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Aluno</h2>
          <div className={styles.actionGrid}>
            <Link to="/noticia/novo" className={styles.cardLink}>
              <div className={styles.actionCard}>
                <div className={styles.iconCircle}><FilePlus size={22} /></div>
                <strong>Adicionar Notícia</strong>
              </div>
            </Link>
          </div>
        </section>
      )}

      <SimpleFooter />
    </div>
  );
}

export default Home;