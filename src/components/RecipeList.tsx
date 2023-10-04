import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import RecipeCard from "./RecipeCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { tmp } from "../services/tmp-data";

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

interface Props {
  requestURL: string;
}

const RecipeList = ({ requestURL }: Props) => {
  const [recipes, setRecipes] = useState(tmp);
  const [error, setError] = useState("");

  /*useEffect(() => {
    apiClient
      .get(requestURL)
      .then((res) => {
        setRecipes(res.data.results);
        console.log("Data fetched succesfully.");
        console.log(res.data);
      })
      .catch((err) => setError(err.message));
  }, [requestURL]);*/

  return (
    <Box height="100vh" overflow="auto">
      {error && <p>{error}</p>}
      <SimpleGrid minChildWidth="250px" spacing={5}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RecipeList;
