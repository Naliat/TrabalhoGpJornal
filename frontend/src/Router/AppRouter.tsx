import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import ProtectedLayout from "../layout/ProtectedLayout";

function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Landing />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;