import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Step {
  number: number;
  step: string;
}

interface Instructions {
  steps: Step[];
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

interface Nutrient {
  amount: number;
  unit: string;
  name: string;
}

interface Nutrition {
  ingredients: Ingredient[];
  nutrients: Nutrient[];
}

export interface Recipe {
  id: number;
  analyzedInstructions: Instructions[];
  diets: string[];
  image: string;
  imageType: string;
  nutrition: Nutrition;
  readyInMinutes: number;
  sourceUrl: string;
  servings: number;
  title: string;
}

export interface UrlType {
  filter: string;
  query: string;
  page: string;
}

export interface ApiResponse {
  number: number;
  offset: number;
  results: Recipe[];
  totalResults: number;
}

const MAX_RESULT_COUNT = 1;
const BASE_URL = `/complexSearch?number=${MAX_RESULT_COUNT}&instructionsRequired=true&ignorePantry=true&addRecipeNutrition=true`;

const useRecipes = (requestURL: UrlType) => {
  const [recipes, setRecipes] = useState<ApiResponse>({
    number: 1,
    offset: 0,
    results: [],
    totalResults: 1,
  });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const url = BASE_URL + requestURL.filter + requestURL.query + requestURL.page;

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
