import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../auth/hooks/useAuth";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated )
    return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;