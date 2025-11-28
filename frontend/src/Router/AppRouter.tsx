import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "../layout/ProtectedLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard"; 

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Rota Protegida (Exige autenticação) */}
                <Route element={<ProtectedLayout />}>
                    {/* A rota principal "/" só é acessível após o login bem-sucedido */}
                    <Route path="/" element={<Dashboard />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;