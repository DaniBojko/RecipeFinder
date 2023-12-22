import Context, { ContextType } from "../services/auth-provider";
import { useContext } from "react";

const useGlobalState = () => {
  return useContext(Context) as ContextType;
};

export default useGlobalState;
