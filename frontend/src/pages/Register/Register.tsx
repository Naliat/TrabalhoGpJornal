import { useState } from 'react'; 
import styles from "./Register.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';

const REGISTER_URL = "http://localhost:8000/users/register";

function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        setIsLoading(true);

        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                alert("Conta criada com sucesso! Faça login.");
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Falha ao registrar. Tente outro email.");
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

                <h2 className={styles.title}>Criar conta</h2>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label>Nome completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={fullName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Seu email"
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
                            placeholder="Crie uma senha"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirmar senha</label>
                        <input
                            type="password"
                            placeholder="Repita a senha"
                            value={confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    <button type="submit" className={styles.registerBtn} disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>

                <p className={styles.loginRedirect}>
                    Já possui conta? <Link to="/login">Entrar</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;