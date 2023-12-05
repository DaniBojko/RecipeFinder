import AuthContext, { AuthContextType } from "../services/auth-provider";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
