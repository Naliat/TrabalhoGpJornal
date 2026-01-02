import {
  UserPlus,
  Users,
  GraduationCap,
  FilePlus,
} from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth";
import { USER_TYPE } from "../../types/enums/UserTypeEnum";

import styles from "./Home.module.css";

function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated || !user) {
    return <p>Você não está autenticado.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {user.username}</h1>

      {user.userType === USER_TYPE.ADMIN && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Administrador</h2>

          <div className={styles.actionGrid}>
            <div className={styles.actionCard}>
              <div className={styles.iconCircle}>
                <UserPlus size={22} />
              </div>
              <strong>Criar Usuário</strong>
            </div>

            <div className={styles.actionCard}>
              <div className={styles.iconCircle}>
                <Users size={22} />
              </div>
              <strong>Visualizar Usuários</strong>
            </div>
          </div>
        </section>
      )}

      {user.userType === USER_TYPE.TEACHER && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Professor</h2>

          <div className={styles.actionGrid}>
            <div className={styles.actionCard}>
              <div className={styles.iconCircle}>
                <GraduationCap size={22} />
              </div>
              <strong>Criar Aluno</strong>
            </div>

            <div className={styles.actionCard}>
              <div className={styles.iconCircle}>
                <Users size={22} />
              </div>
              <strong>Visualizar Alunos</strong>
            </div>
          </div>
        </section>
      )}

      {user.userType === USER_TYPE.STUDENT && (
        <section className={styles.roleSection}>
          <h2 className={styles.sectionTitle}>Área do Aluno</h2>

          <div className={styles.actionGrid}>
            <div className={styles.actionCard}>
              <div className={styles.iconCircle}>
                <FilePlus size={22} />
              </div>
              <strong>Adicionar Notícia</strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
