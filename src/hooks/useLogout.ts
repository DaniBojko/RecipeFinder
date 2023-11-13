import useBackEndPrivate from "../hooks/useBackEndPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const uselogOut = () => {
  const { setAuth } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const backEndPrivate = useBackEndPrivate();

  const logout = () => {
    backEndPrivate
      .get("/logout")
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
