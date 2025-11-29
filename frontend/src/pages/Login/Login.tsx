import { useState } from 'react';
import styles from "./Login.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';

const LOGIN_URL = "http://localhost:8000/users/login";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('username', data.username);

                navigate('/');

            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Usuário ou senha inválidos.");
            }

        } catch (err) {
            console.error("Erro de rede/CORS:", err);
            setError("Não foi possível conectar ao servidor backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={logo} alt="Logo" className={styles.logo} />

                <h2 className={styles.title}>Entrar</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? 'Aguarde...' : 'Entrar'}
                    </button>
                </form>

                <p className={styles.registerLink}>
                    Não tem conta? <Link to="/register">Registre-se</Link>
                </p>

                <p className={styles.backHome}>
                    <Link to="/">← Voltar para a página inicial</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;