import { createContext, useEffect, useState } from "react";
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

export type ContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

const Context = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );

  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
    search: "",
    page: "",
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <Context.Provider value={{ auth, setAuth, searchParams, setSearchParams }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
