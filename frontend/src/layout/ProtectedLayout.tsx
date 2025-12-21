import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header/Header";

import { useAuth } from "../auth/hooks/useAuth";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;