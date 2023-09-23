import { ChakraProvider, Show } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import FilterByIngredients from "./FilterByIngredients";
import NavBar from "./NavBar";

export interface Ingredient {
  name: string;
  id: number;
}

const tmp = [
  { name: "vaj", id: 1 },
  { name: "sajt", id: 2 },
];

function MainPage() {
  const [ingredients, updateIngredients] = useState(tmp);
  const [componentState, updateComponentState] = useState(0);
  const [windowWidth, windowHeight] = useWindowSize();

  const deleteIngredient = (deleteById: number) => {
    if (deleteById === -1) updateIngredients([]);
    else
      updateIngredients(
        ingredients.filter((ingredient) => ingredient.id != deleteById)
      );
  };

  const addIngredient = (item: string) => {
    if (item) updateIngredients([{ name: item, id: 5 }, ...ingredients]); // FIX WITH DATA
  };

  const returnFilter = () => {
    return (
      <FilterByIngredients
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
    if (componentState % 2 == 0 || windowWidth >= 768) return returnMain(); //768 - tablet size

    return returnFilter();
  };

  return (
    <ChakraProvider>
      <Grid
        templateAreas={{ base: `"nav" "main"`, md: `"nav nav" "aside main"` }}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={{ base: "1fr", md: "30% 1fr", lg: "300px 1fr" }}
        color="blackAlpha.700"
        fontWeight="bold"
        height="100vh"
      >
        <GridItem pl="2" padding="0.5rem" area={"nav"}>
          <NavBar state={{ componentState, updateComponentState }}></NavBar>
        </GridItem>

        <Show above="md">
          <GridItem overflow="auto" padding="0.5rem" pl="2" area={"aside"}>
            {returnFilter()}
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

export default MainPage;
