import NavBar from "./NavBar";
import RecipeGrid from "./RecipeGrid";
import { useEffect } from "react";
import useRecipes from "../hooks/useRecipes";
import PageFlipper from "./PageFlipper";
import { tmp } from "../services/tmp-data";
import { requestLinkBuilder } from "../services/requestLinkBuilder";
import BackGroundWrapper from "./Wrappers/BackGroundWrapper";
import useAuth from "../hooks/useAuth";

const MainPage = () => {
  const { searchParams } = useAuth();
  const requestParams = {
    search: searchParams.get("search") || "",
    page: parseInt(searchParams.get("page") || "0"),
    filter: searchParams.get("filter") || "",
  };
  const requestLink = requestLinkBuilder(requestParams) || "";
  //console.log(requestLink);
  const { recipes, error, isLoading } = useRecipes(requestLink);
  const maxPages = Math.ceil(recipes.totalResults / recipes.number) - 1 || 0;

  /*FILTER PROBLEM FIX*/

  //const maxPages = Math.ceil(tmp.length / 3) - 1;
  //const isLoading = false;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [requestParams.page]);

  return (
    <BackGroundWrapper>
      <>
        <NavBar />
        <RecipeGrid
          recipes={recipes.results}
          error={error}
          isLoading={isLoading}
          /*recipes={tmp.slice(
            requestParams.page * 3,
            requestParams.page * 3 + 3
          )}
          error=""
          isLoading={false}*/
        />
        {!isLoading && (
          <PageFlipper currentPage={requestParams.page} maxPages={maxPages} />
        )}
      </>
    </BackGroundWrapper>
  );
};

export default MainPage;
