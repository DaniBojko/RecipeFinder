import backEnd from "../services/back-end";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = () => {
    let accessToken = "";

    backEnd
      .post("/refresh", { refreshToken: auth.refreshToken })
      .then((res) => {
        accessToken = res.data.accessToken;
        setAuth((prev) => {
          console.log(prev);
          return { ...prev, accessToken: res.data.accessToken };
        });
      })
      .catch((err) => console.log(err));
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
