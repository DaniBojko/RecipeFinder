import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { theme } from "../assets/StyleVariables";
import { useEffect, useState } from "react";

function MainPage() {
  const [requestURLobj, setRequestURLobj] = useState({
    filter: "",
    query: "",
    page: "",
  });

  useEffect(() => {
    console.log("new page");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [requestURLobj.page]);

  return (
    <ChakraProvider theme={theme}>
      <Box position="sticky" top="0" zIndex="999">
        <NavBar
          onClick={(data) => {
            setRequestURLobj((prev) => ({ ...prev, ...data }));
          }}
        />
      </Box>

      <RecipeGrid
        requestURL={requestURLobj}
        onClick={(data) => {
          setRequestURLobj((prev) => ({ ...prev, page: data }));
        }}
      />
    </ChakraProvider>
  );
}

export default MainPage;
