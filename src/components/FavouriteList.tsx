import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import useBackEndPrivate from "../hooks/useBackEndPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarWrapper from "./Wrappers/NavBarWrapper";
import { Button, ChakraProvider, Spacer } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";
import uselogOut from "../hooks/useLogout";

const FavouriteList = () => {
  const { auth } = useAuth();
  const logout = uselogOut();
  const recipes = auth.favouriteList;
  const [query, setQuery] = useState("");
  let filteredRecipes = recipes.filter((recipe) => {
    const tmp = recipe.toString();
    return tmp.indexOf(query) !== -1;
  });
  const navigate = useNavigate();
  /*const [recipes, setRecipes] = useState<number[]>([]);
  const backEndPrivate = useBackEndPrivate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    backEndPrivate
      .get("/users", { signal: controller.signal })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        navigate("/login", { state: { from: location }, replace: true });
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, []);*/

  return (
    <ChakraProvider>
      <NavBarWrapper>
        <Button
          colorScheme="orange"
          variant="solid"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Spacer />
        <SearchBar onChange onSubmit={(query) => setQuery(query)}></SearchBar>
        <Spacer />

        <Button colorScheme="orange" variant="solid" onClick={() => logout()}>
          Log out
        </Button>
      </NavBarWrapper>
      {recipes.length !== 0 && (
        <ul>
          {filteredRecipes.map((recipe, index) => (
            <li key={index}>{recipe}</li>
          ))}
        </ul>
      )}
    </ChakraProvider>
  );
};

export default FavouriteList;
