import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/Navbar";

export const Authorized = () => {
  if (localStorage.getItem("wish_token")) {
    return (
      <>
        <NavBar />
        <main className="p-4 mt-20">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
