import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import type { UserForm } from "../../../types/user/domain/UserForm";
import { USER_TYPE, type UserType } from "../../../types/enums/UserTypeEnum";
import { useRegister } from "../hooks/useRegister";

import styles from "../Register.module.css";

function RegisterForm() {
    const [formData, setFormData] = useState<UserForm>({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        userType: USER_TYPE.STUDENT,
    });

    const [showPassword, setShowPassword] = useState(false);

    const { handleRegister, isLoading, errorMessage } = useRegister();

    return (
        <div className={styles.cardForm}>
            <form className={styles.form}>
                <div className={styles.floatingGroup}>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Nome"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                        }
                        disabled={isLoading}
                    />
                    <label htmlFor="firstName">Nome</label>
                </div>

                <div className={styles.floatingGroup}>
                    <input
                        id="secondName"
                        type="text"
                        placeholder="Sobrenome"
                        value={formData.secondName}
                        onChange={(e) =>
                            setFormData({ ...formData, secondName: e.target.value })
                        }
                        disabled={isLoading}
                    />
                    <label htmlFor="secondName">Sobrenome</label>
                </div>

                <div className={styles.floatingGroup}>
                    <input
                        id="email"
                        type="email"
                        placeholder="nome.sobrenome@sigla.ufc.br"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={isLoading}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className={styles.floatingGroup}>
                    <select
                        id="userType"
                        value={formData.userType}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                userType: e.target.value as UserType,
                            })
                        }
                        disabled={isLoading}
                    >
                        {Object.values(USER_TYPE).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="userType">Tipo de usuário</label>
                </div>

                <div className={styles.floatingGroup}>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        disabled={isLoading}
                    />
                    <label htmlFor="password">Senha</label>

                    <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}

                <button
                    type="button"
                    className={styles.registerBtn}
                    disabled={isLoading}
                    onClick={() => handleRegister(formData)}
                >
                    {isLoading ? "Registrando..." : "Criar conta"}
                </button>
                
                <p className={styles.backHome}>
                    <Link to="/home">← Voltar</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
