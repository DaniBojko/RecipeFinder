import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { theme } from "../assets/StyleVariables";
import { useState } from "react";

function MainPage() {
  const [requestURL, setRequestURL] = useState({
    filter: "",
    query: "",
    page: "",
  });

  //const { recipes = tmp, error = "", isLoading = false } = {};

  /*console.log(
    recipes.totalResults,
    recipes.number,
    Math.ceil(recipes.totalResults / recipes.number)
  );*/

  return (
    <ChakraProvider theme={theme}>
      <NavBar
        onClick={(data) => {
          setRequestURL((prev) => ({ ...prev, ...data }));
        }}
      />

      <RecipeGrid
        requestURL={requestURL}
        onClick={(data) => {
          setRequestURL((prev) => ({ ...prev, page: data }));
        }}
      />
    </ChakraProvider>
  );
}

export default MainPage;
