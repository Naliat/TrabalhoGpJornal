import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
