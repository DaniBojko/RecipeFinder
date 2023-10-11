import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { useState } from "react";
import { theme } from "../assets/StyleVariables";

const MAX_RESULT_COUNT = 1;
const BASE_URL = `/complexSearch?number=${MAX_RESULT_COUNT}&instructionsRequired=true&ignorePantry=true`;

function MainPage() {
  const [requestURL, setRequestURL] = useState(BASE_URL);

  return (
    <ChakraProvider theme={theme}>
      <NavBar
        onClick={(filterOptions) => {
          const url = BASE_URL + filterOptions;
          if (url != requestURL) {
            setRequestURL(BASE_URL + filterOptions);
            console.log(url);
          }
        }}
      />

      <RecipeGrid requestURL={requestURL} />
    </ChakraProvider>
  );
}

export default MainPage;
