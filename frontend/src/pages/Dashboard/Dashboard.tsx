// tela apenas para verificar Login, vai ser retirada posteriomenteeee

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styles from './Dashboard.module.css'; 

function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('usuário');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');

        if (loggedInUser) {
            setUsername(loggedInUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            backgroundColor: '#f4f7f6', 
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                width: '100%',
                margin: 'auto'
            }}>
                <img 
                    src="https://img.icons8.com/color/96/000000/ok--v1.png" 
                    alt="Success icon" 
                    style={{ marginBottom: '20px' }}
                />
                <h1 style={{ color: '#007bff' }}>Parabéns, {username}!</h1>
                <h3 style={{ color: '#333' }}>Você acessou o Dashboard com sucesso.</h3>
                
                <p style={{ marginTop: '30px', color: '#666' }}>
                    Esta é a sua área de sistema protegida.
                </p>
                
                <button 
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Sair
                </button>
            </div>
        </div>
    );
}

export default Dashboard;