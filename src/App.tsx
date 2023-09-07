import { Button, ChakraProvider, Hide, Show } from "@chakra-ui/react";
import { Grid, GridItem, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import IngredientSearcher from "./components/IngredientSearcher";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {
  const [ingredients, updateIngredients] = useState(["vaj", "sajt"]);
  const [ComponentState, updateComponentState] = useState(0);
  const [windowWidth, windowHeight] = useWindowSize();

  const breakpoints = {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };
  extendTheme({ breakpoints });

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

  const returnIngredientSearcher = () => {
    return (
      <IngredientSearcher
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
        addIngredient={addIngredient}
      />
    );
  };

  const returnMain = () => {
    return (
      <p>
        {windowWidth} {windowHeight}
      </p>
    );
  };

  const IngredientOrMain = () => {
    if (ComponentState % 2 == 0 || windowWidth >= 768) return returnMain();

    return returnIngredientSearcher();
  };

  return (
    <ChakraProvider>
      <Grid
        templateAreas={{ base: `"nav" "main"`, md: `"nav nav" "aside main"` }}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={{ base: "1fr", md: "30% 1fr", lg: "300px 1fr" }}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        height="100vh"
      >
        <GridItem pl="2" padding="0.5rem" bg="orange.300" area={"nav"}>
          <Hide above="md">
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => updateComponentState(ComponentState + 1)}
            >
              Button
            </Button>
          </Hide>
        </GridItem>

        <Show above="md">
          <GridItem overflow="auto" padding="0.5rem" pl="2" area={"aside"}>
            {returnIngredientSearcher()}
          </GridItem>
        </Show>

        <GridItem
          overflow="auto"
          bg="green.300"
          padding="0.5rem"
          pl="2"
          area={"main"}
        >
          {IngredientOrMain()}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

/*

      */
