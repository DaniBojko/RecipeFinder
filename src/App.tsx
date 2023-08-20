import { ChakraProvider, Show } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import IngredientSearcher from "./components/IngredientSearcher";

function App() {
  const [ingredients, updateIngredients] = useState(["vaj", "sajt"]);

  const deleteIngredient = (deleteById: number) => {
    console.log(deleteById);
    if (deleteById == -1) updateIngredients([]);
    else
      updateIngredients(
        ingredients.filter((ingredient, index) => index != deleteById)
      );
  };

  const addIngredient = (item: string) => {
    if (item) updateIngredients([item, ...ingredients]);
  };

  return (
    <ChakraProvider>
      <Grid
        templateAreas={{ base: `"nav" "main"`, md: `"nav nav" "aside main"` }}
        gridTemplateRows={"7vh 92vh"}
        gridTemplateColumns={{ base: "1fr", md: "30% 1fr", lg: "300px 1fr" }}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"nav"}>
          Nav
        </GridItem>
        <Show above="md">
          <GridItem overflow="auto" padding="0.5rem" pl="2" area={"aside"}>
            <IngredientSearcher
              ingredients={ingredients}
              deleteIngredient={deleteIngredient}
              addIngredient={addIngredient}
            />
          </GridItem>
        </Show>

        <GridItem overflow="auto" pl="2" bg="green.300" area={"main"}>
          Main
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
