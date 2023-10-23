import RecipeCard from "./RecipeCard";
import {
  Box,
  IconButton,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import RecipeSkeleton from "./RecipeSkeleton";
import useRecipes, { UrlType } from "../hooks/useRecipes";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface Props {
  requestURL: UrlType;
  onClick: (data: string) => void;
}

const RecipeGrid = ({ requestURL, onClick }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const { recipes, error, isLoading } = useRecipes(requestURL);
  const maxPages = Math.floor(recipes.totalResults / recipes.number);

  return (
    <Flex
      justifyContent="center"
      padding="20px"
      backgroundImage="linear-gradient(to bottom,#fff 1.5%,#f0f9f9 5.5%)"
    >
      <Box>
        {error && <p>{error} </p>}
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="1.5rem">
          {isLoading &&
            skeletons.map((skeleton) => <RecipeSkeleton key={skeleton} />)}
          {recipes.results.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
          ))}
        </SimpleGrid>

        <HStack marginTop="2rem">
          <IconButton
            aria-label="Previous page"
            colorScheme="orange"
            isDisabled={recipes.offset === 0}
            onClick={() => {
              onClick(`&offset=${recipes.offset - recipes.number}`);
            }}
            icon={<ArrowBackIcon />}
          ></IconButton>
          <Spacer />
          <IconButton
            aria-label="Next page"
            colorScheme="orange"
            isDisabled={recipes.offset / recipes.number === maxPages}
            onClick={() => {
              onClick(`&offset=${recipes.offset + recipes.number}`);
            }}
            icon={<ArrowForwardIcon />}
          ></IconButton>
        </HStack>
      </Box>
    </Flex>
  );
};

export default RecipeGrid;
