import { useState } from "react";

import { Link } from "react-router-dom";

import { useRegister } from "./hooks/useRegister";

import { USER_TYPE, type UserType } from "../../types/enums/UserTypeEnum";
import type { UserForm } from "../../types/user/domain/UserForm";

import styles from "./Register.module.css";
import Logotype from "../../components/Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

function Register() {
  const [formData, setFormData] = useState<UserForm>({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    userType: USER_TYPE.STUDENT,
  });


  const {
    handleRegister,
    isLoading,
    errorMessage,
  } = useRegister();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Logotype size={LOGO_SIZE_TYPE.LG} />

        <h2 className={styles.title}>Criar conta</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Sobrenome</label>
            <input
              type="text"
              placeholder="Digite seu sobrenome"
              value={formData.secondName}
              onChange={(e) => setFormData({...formData, secondName: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>E-mail institucional</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tipo de usuário</label>
            <select
              value={formData.userType}
              onChange={(e) => setFormData({...formData, userType: e.target.value as UserType})}
              disabled={isLoading}
              required
            >
              {Object.values(USER_TYPE).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            className={styles.registerBtn}
            disabled={isLoading}
            onClick={() => handleRegister(formData)}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p className={styles.loginRedirect}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>

        <p className={styles.backHome}>
          <Link to="/">← Voltar para a página inicial</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
