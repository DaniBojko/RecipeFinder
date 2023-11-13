import RecipeCard from "./RecipeCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RecipeSkeleton from "./RecipeSkeleton";
import { Recipe } from "../hooks/useRecipes";
import GridWrapper from "./Wrappers/GridWrapper";

interface Props {
  recipes: Recipe[];
  error: string;
  isLoading: boolean;
}

const RecipeGrid = ({ recipes, error, isLoading }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <GridWrapper>
      <Box>
        {error && <p>{error} </p>}
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="1.5rem">
          {isLoading &&
            skeletons.map((skeleton) => <RecipeSkeleton key={skeleton} />)}
          {!isLoading &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
            ))}
        </SimpleGrid>
      </Box>
    </GridWrapper>
  );
};

export default RecipeGrid;
