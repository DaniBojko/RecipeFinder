import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { backEndPrivate } from "../services/back-end";
import { useEffect } from "react";

const useBackEndPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = backEndPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = backEndPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        //console.log(error);
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return backEndPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      backEndPrivate.interceptors.request.eject(requestIntercept);
      backEndPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return backEndPrivate;
};

export default useBackEndPrivate;
