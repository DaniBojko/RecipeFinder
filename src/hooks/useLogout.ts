import backEnd from "../services/back-end";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const uselogOut = () => {
  const { auth, setAuth } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const logout = () => {
    backEnd
      .post("/logout", { refreshToken: auth.refreshToken })
      .then(() => {
        setAuth({});
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Server error.",
          description: "Server could not handle the request.",
          status: "error",
          duration: 3000,
          variant: "subtle",
        });
      });
  };

  return logout;
};

export default uselogOut;
