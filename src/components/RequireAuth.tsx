import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const hasAuthorized = Object.keys(auth).length !== 0;

  if (hasAuthorized) return <Outlet />;
  else return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
