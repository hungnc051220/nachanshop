import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/commonFunction";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);

  let isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
