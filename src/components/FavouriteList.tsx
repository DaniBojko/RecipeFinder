import RecipeGrid from "./RecipeGrid";
import BackGroundWrapper from "./Wrappers/BackGroundWrapper";
import { useState } from "react";
import FavNav from "./FavNav";
import useRecipes from "../hooks/useRecipes";
import { Recipe } from "./MainPage";
import { backEndPrivate } from "../services/back-end";

const FavouriteList = () => {
  const [query, setQuery] = useState("");
  const { recipes, error, isLoading } = useRecipes<Recipe[]>(
    backEndPrivate,
    "/users"
  );
  const filteredRecipes =
    recipes === undefined
      ? []
      : recipes.filter(
          (recipe) => recipe.title.toLowerCase().indexOf(query) !== -1
        );

  return (
    <BackGroundWrapper>
      <>
        <FavNav onChange={(q) => setQuery(q.toLowerCase())} />
        <RecipeGrid
          recipes={filteredRecipes}
          error={error}
          isLoading={isLoading}
        />
      </>
    </BackGroundWrapper>
  );
};

export default FavouriteList;
