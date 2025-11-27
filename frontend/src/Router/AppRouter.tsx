import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import ProtectedLayout from "../layout/ProtectedLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Landing />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;