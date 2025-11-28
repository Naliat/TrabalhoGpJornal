import { useState } from 'react'; // CORREÇÃO: Removido o import do 'React' não usado
import styles from "./Register.module.css";
import logo from "../../assets/logo_ufc_quixada.png";
import { Link, useNavigate } from "react-router-dom"; 
import React from 'react'; // Manter React para tipagem de eventos

// ----------------------------------------------------------------------
// URL do Backend
// ----------------------------------------------------------------------
const REGISTER_URL = "http://localhost:8000/users/register"; 

function Register() {
    const navigate = useNavigate(); 

    // 1. Gerenciamento de Estado
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 2. Função de Submissão
    // CORREÇÃO: Tipagem explícita do evento (React.FormEvent<HTMLFormElement>)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
        setError('');
        
        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return; 
        }

        setIsLoading(true);

        // Mapeamento para o formato 'x-www-form-urlencoded' exigido pelo FastAPI
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
                navigate('/login'); // Redireciona para a tela de login
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
                            // CORREÇÃO: Tipagem explícita do evento onChange
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
                            // CORREÇÃO: Tipagem explícita do evento onChange
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
                            // CORREÇÃO: Tipagem explícita do evento onChange
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
                            // CORREÇÃO: Tipagem explícita do evento onChange
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