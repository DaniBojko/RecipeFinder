import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Recipe {
  id: number;
  image: string;
  imageType: string;
  readyInMinutes: number;
  sourceUrl: string;
  servings: number;
  title: string;
}

export interface ApiResponse {
  number: number;
  offset: number;
  results: Recipe[];
  totalResults: number;
}

export const MAX_RESULT_COUNT = 1;
const BASE_URL = `/complexSearch?number=${MAX_RESULT_COUNT}&instructionsRequired=true&ignorePantry=true&addRecipeInformation=true`;

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
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get(url, {
        signal: controller.signal,
      })
      .then((res) => {
        setRecipes(res.data);
        console.log("Data fetched succesfully.\n", res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [requestURL]);

  return { recipes, error, isLoading };
};

export default useRecipes;
