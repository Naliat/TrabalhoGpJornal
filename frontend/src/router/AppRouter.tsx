import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "lucide-react";

import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Landing from "../pages/Landing/Landing";
import Newsletter from "../pages/Newsletter/Newsletter";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-newsletter" element={<Newsletter />} />
        <Route path="/cadastro" element={<Register />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
