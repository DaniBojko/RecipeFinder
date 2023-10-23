import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { theme } from "../assets/StyleVariables";
import { useEffect, useState } from "react";

function MainPage() {
  const [requestURL, setRequestURL] = useState({
    filter: "",
    query: "",
    page: "",
  });

  useEffect(() => {
    console.log("scrolled");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [requestURL.page]);

  return (
    <ChakraProvider theme={theme}>
      <Box position="sticky" top="0" zIndex="999">
        <NavBar
          onClick={(data) => {
            setRequestURL((prev) => ({ ...prev, ...data }));
          }}
        />
      </Box>

      {
        <RecipeGrid
          requestURL={requestURL}
          onClick={(data) => {
            setRequestURL((prev) => ({ ...prev, page: data }));
          }}
        />
      }
    </ChakraProvider>
  );
}

export default MainPage;
