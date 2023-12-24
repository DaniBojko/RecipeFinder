import { useEffect, useState } from "react";
import { AxiosInstance, CanceledError } from "axios";

const useRecipes = <T>(api: AxiosInstance, endPoint: string) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<T | undefined>(undefined);

  useEffect(() => {
    console.log(endPoint);
    const controller = new AbortController();
    let loadingTimeout = 0;
    setLoading(true);

    api
      .get(endPoint, { signal: controller.signal })
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
      });

    return () => {
      controller.abort();
      clearTimeout(loadingTimeout);
    };
  }, [endPoint]);

  return { recipes, error, isLoading };
};

export default useRecipes;
