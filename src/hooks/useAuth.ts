import AuthContext, { ContextType } from "../services/auth-provider";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext) as ContextType;
};

export default useAuth;
