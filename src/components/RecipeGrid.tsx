import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import RecipeCard from "./RecipeCard";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { tmp } from "../services/tmp-data";
import RecipeSkeleton from "./RecipeSkeleton";
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
  servings: number;
  title: string;
}

interface Props {
  requestURL: string;
}

const RecipeGrid = ({ requestURL }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const skeletons = [1, 2, 3, 4];
  //console.log(recipes);

  /*useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get(requestURL, { signal: controller.signal })
      .then((res) => {
        setRecipes(res.data.results);
        console.log("Data fetched succesfully.");
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [requestURL]);*/

  return (
    <Flex
      height="90vh"
      overflow="auto"
      backgroundImage="linear-gradient(to bottom,#fff 1.5%,#f0f9f9 5.5%)"
      justifyContent="center"
    >
      <Box>
        {error && <p>{error}</p>}
        <SimpleGrid
          padding="20px"
          columns={{ sm: 1, md: 2, xl: 4 }}
          spacing="1.5rem"
        >
          {isLoading &&
            skeletons.map((skeleton) => <RecipeSkeleton key={skeleton} />)}
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default RecipeGrid;
