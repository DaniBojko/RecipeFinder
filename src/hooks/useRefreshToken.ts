import backEnd from "../services/back-end";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    let accessToken = "";

    await backEnd
      .post("/refresh", { refreshToken: auth.refreshToken })
      .then((res) => {
        accessToken = res.data.accessToken;
        setAuth((prev) => {
          return { ...prev, accessToken: accessToken };
        });
      })
      .catch((err) => console.log(err));
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
