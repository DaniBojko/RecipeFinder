import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import useBackEndPrivate from "../hooks/useBackEndPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarWrapper from "./Wrappers/NavBarWrapper";
import {
  Button,
  Center,
  ChakraProvider,
  Heading,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import uselogOut from "../hooks/useLogout";
import { Recipe } from "../hooks/useRecipes";
import RecipeGrid from "./RecipeGrid";
import { IoLogOutSharp } from "react-icons/io5";
import BackGroundWrapper from "./Wrappers/BackGroundWrapper";

const FavouriteList = () => {
  const logout = uselogOut();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.title.toLowerCase().indexOf(query) !== -1
  );
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const backEndPrivate = useBackEndPrivate();
  const location = useLocation();

  useEffect(() => {
    console.log("I RUN");
    const controller = new AbortController();
    let loadingTimeout = 0;
    setLoading(true);

    backEndPrivate
      .get("/users", { signal: controller.signal })
      .then((res) => {
        loadingTimeout = setTimeout(() => {
          setRecipes(res.data);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
        setLoading(false);
        setError(err.message);
        navigate("/login", { state: { from: location }, replace: true });
      });

    return () => {
      controller.abort();
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
};

export default FavouriteList;
