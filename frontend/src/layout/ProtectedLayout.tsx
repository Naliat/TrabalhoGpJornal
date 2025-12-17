import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;