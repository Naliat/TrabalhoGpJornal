import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./PasswordRecovery.module.css";
import SimpleFooter from "../../components/Footer/SimpleFooter";
import Logotype from "../../components/Logotype/Logotype";
import { LOGO_SIZE_TYPE } from "../../types/enums/LogoSizeTypeEnum";

function PasswordRecovery() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    function handleRecovery() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(
                "Se o e-mail estiver cadastrado, enviaremos instruções para redefinir sua senha."
            );
            setEmail("");
        }, 1200);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <Logotype size={LOGO_SIZE_TYPE.LG} />
                </header>

                <main className={styles.main}>
                    <div className={styles.cards}>
                        <div className={styles.text}>
                            <h1 className={styles.title}>Recuperar senha</h1>
                            <p className={styles.subtitle}>
                                Informe seu e-mail institucional para receber as instruções de
                                redefinição de senha
                            </p>
                        </div>

                        <div className={styles.cardForm}>
                            <form className={styles.form}>
                                <div className={styles.floatingGroup}>
                                    <input
                                        id="recovery-email"
                                        type="email"
                                        placeholder="nome.sobrenome@sigla.ufc.br"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="recovery-email">Email</label>
                                </div>

                                {successMessage && (
                                    <p className={styles.successMessage}>{successMessage}</p>
                                )}

                                <button
                                    type="button"
                                    className={styles.recoverBtn}
                                    onClick={handleRecovery}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Aguarde..." : "Enviar instruções"}
                                </button>
                            </form>

                            <p className={styles.backHome}>
                                <Link to="/login">← Voltar para o login</Link>
                            </p>

                            <p className={styles.backHome}>
                                <Link to="/">← Voltar para a página inicial</Link>
                            </p>
                        </div>
                    </div>
                </main>

                <SimpleFooter />
            </div>
        </div>
    );
}

export default PasswordRecovery;