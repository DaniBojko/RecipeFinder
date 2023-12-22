import RecipeGrid from "./RecipeGrid";
import BackGroundWrapper from "./Wrappers/BackGroundWrapper";
import useFavourites from "../hooks/useFavourites";
import { useState } from "react";
import NavBar from "./NavBar";

const FavouriteList = () => {
  const [query, setQuery] = useState("");
  const { recipes, error, isLoading } = useFavourites();
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.title.toLowerCase().indexOf(query) !== -1
  );

  return (
    <BackGroundWrapper>
      <>
        <NavBar onChange={(q) => setQuery(q.toLowerCase())} />
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
