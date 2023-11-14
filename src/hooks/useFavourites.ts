import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import useBackEndPrivate from "../hooks/useBackEndPrivate";
import { Recipe } from "../hooks/useRecipes";
import { useLocation, useNavigate } from "react-router-dom";

const useFavourites = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const backEndPrivate = useBackEndPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    let loadingTimeout = 0;
    setLoading(true);

    backEndPrivate
      .get("/users", { signal: controller.signal })
      .then((res) => {
        loadingTimeout = setTimeout(() => {
          setRecipes(res.data);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
        setLoading(false);
        setError(err.message);
        navigate("/login", { state: { from: location }, replace: true });
      });

    return () => {
      controller.abort();
      clearTimeout(loadingTimeout);
    };
  }, []);

  return { recipes, error, isLoading };
};

export default useFavourites;
