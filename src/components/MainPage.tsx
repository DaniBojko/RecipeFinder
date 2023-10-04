import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeList from "./RecipeList";
import { useState } from "react";

const MAX_RESULT_COUNT = 1;
const BASE_URL = `/complexSearch?number=${MAX_RESULT_COUNT}&instructionsRequired=true&ignorePantry=true`;

function MainPage() {
  const [requestURL, setRequestURL] = useState(BASE_URL);

  return (
    <ChakraProvider>
      <NavBar
        onClick={(filterOptions) => {
          const url = BASE_URL + filterOptions;
          if (url != requestURL) {
            setRequestURL(BASE_URL + filterOptions);
            console.log(url);
          }
        }}
      />

      <RecipeList requestURL={requestURL} />
    </ChakraProvider>
  );
}

export default MainPage;
