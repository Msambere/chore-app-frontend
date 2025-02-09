import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const loggedInUser: string | null = localStorage.getItem("username");
  return loggedInUser && loggedInUser !== "" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
