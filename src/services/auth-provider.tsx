import { createContext, useState } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

type AuthType = {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  favouriteList: number[];
};

export type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
    search: "",
    page: "",
  });

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, searchParams, setSearchParams }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
