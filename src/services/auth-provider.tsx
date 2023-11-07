import { createContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

export type ContextType = {
  auth: object;
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
