import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Recipe {
  id: number;
  image: string;
  readyInMinutes: number;
  sourceUrl: string;
  title: string;
}

export interface ApiResponse {
  number: number;
  offset: number;
  results: Recipe[];
  totalResults: number;
}

export const MAX_RESULT_COUNT = 3;
const BASE_URL = `/complexSearch?number=${MAX_RESULT_COUNT}`;

const useRecipes = (requestURL: string) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const url = BASE_URL + requestURL;
  const [recipes, setRecipes] = useState<ApiResponse>({
    number: 0,
    offset: 0,
    results: [],
    totalResults: 0,
  });

  useEffect(() => {
    console.log(url);
    const controller = new AbortController();
    let loadingTimeout = 0;
    setLoading(true);

    apiClient
      .get(url, { signal: controller.signal })
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
  }, [requestURL]);

  return { recipes, error, isLoading };
};

export default useRecipes;
