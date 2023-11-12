import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { useEffect, useMemo, useState } from "react";
import useRecipes from "../hooks/useRecipes";
import PageFlipper from "./PageFlipper";
import { tmp } from "../services/tmp-data";
import { requestLinkBuilder } from "../services/requestLinkBuilder";

const MainPage = () => {
  const [requestURLobj, setRequestURLobj] = useState({
    filter: "",
    query: "",
    page: 0,
  });
  const requestLink = requestLinkBuilder(requestURLobj) || "";
  console.log(requestLink);
  //const { recipes, error, isLoading } = useRecipes(requestLink);
  //const maxPages = Math.ceil(recipes.totalResults / recipes.number) - 1 || 3; ///////////////////
  const maxPages = Math.ceil(tmp.length / 3) - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [requestURLobj.page]);

  return (
    <ChakraProvider>
      <NavBar
        onClick={(data) => {
          setRequestURLobj((prev) => ({ ...prev, ...data }));
        }}
      />

      <RecipeGrid
        //recipes={recipes.results}
        recipes={tmp.slice(requestURLobj.page * 3, requestURLobj.page * 3 + 3)}
        //error={error}
        //isLoading={isLoading}
        error=""
        isLoading={false}
      />
      <PageFlipper
        maxPages={maxPages}
        currentPage={requestURLobj.page}
        onClick={(page) => setRequestURLobj({ ...requestURLobj, page: page })}
      />
    </ChakraProvider>
  );
};

export default MainPage;
