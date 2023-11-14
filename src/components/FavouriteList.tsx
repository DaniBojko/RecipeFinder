import { useNavigate } from "react-router-dom";
import NavBarWrapper from "./Wrappers/NavBarWrapper";
import { Button, Spacer } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import uselogOut from "../hooks/useLogout";
import RecipeGrid from "./RecipeGrid";
import BackGroundWrapper from "./Wrappers/BackGroundWrapper";
import useFavourites from "../hooks/useFavourites";
import { useState } from "react";

const FavouriteList = () => {
  const logout = uselogOut();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { recipes, error, isLoading } = useFavourites();
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.title.toLowerCase().indexOf(query) !== -1
  );

  return (
    <BackGroundWrapper>
      <>
        <NavBarWrapper>
          <Button
            colorScheme="orange"
            variant="solid"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Spacer />
          <SearchBar
            onChange
            onSubmit={(query) => setQuery(query.toLowerCase())}
          ></SearchBar>
          <Spacer />

          <Button colorScheme="orange" onClick={() => logout()}>
            Log out
          </Button>
        </NavBarWrapper>

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
