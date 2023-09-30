import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import RecipeCard from "./RecipeCard";
import { SimpleGrid } from "@chakra-ui/react";
import { tmp } from "../services/tmp-data";

const MAX_RESULT_COUNT = 10;

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
  servings: number;
  title: string;
}

const RecipeList = () => {
  //const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState(tmp);
  const [error, setError] = useState("");

  /*useEffect(() => {
    apiClient
      .get(
        "/complexSearch?number=10&addRecipeNutrition=true&intolerances=gluten&instructionsRequired=true&includeIngredients=cheese,pork"
      )
      .then((res) => {
        console.log(JSON.stringify(res.data.results, null, 2));
        setRecipes(res.data.results);
      })
      .catch((err) => setError(err.message));
  }, []);*/

  return (
    <>
      {error && <p>{error}</p>}
      <SimpleGrid minChildWidth="250px" spacing={5}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default RecipeList;
