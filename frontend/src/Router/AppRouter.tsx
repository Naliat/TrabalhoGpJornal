import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import ProtectedLayout from "../layout/ProtectedLayout";
import Login from "../pages/Login/Login";

function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Landing />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;