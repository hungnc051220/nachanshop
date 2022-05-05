import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/commonFunction";

const ProtectedRoutes = () => {
  const location = useLocation();

  let isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
