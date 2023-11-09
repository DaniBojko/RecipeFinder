import { createContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

type AuthType = {
  accessToken: string;
  refreshToken: string;
};

export type ContextType = {
  auth: AuthType;
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
