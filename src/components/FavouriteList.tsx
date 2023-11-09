import { useEffect, useState } from "react";
import backEnd from "../services/back-end";
import useRefreshToken from "../hooks/useRefreshToken";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { CanceledError } from "axios";

const FavouriteList = () => {
  const [recipes, setRecipes] = useState([]);
  const refresh = useRefreshToken();

  useEffect(() => {
    const controller = new AbortController();

    backEnd
      .get("/users", { signal: controller.signal })
      .then((res) => {
        console.log("FVLIST");
        console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    /*const getFavourites = async () => {
      await backEnd
        .get("/users", { signal: controller.signal })
        .then((res) => {
          console.log("FVLIST");
          console.log(res.data);
          setRecipes(res.data);
        })
        .catch((err) => console.log(err));
    };

    getFavourites();*/

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ChakraProvider>
      <Button variant="solid" colorScheme="green" onClick={() => refresh()}>
        Refresh
      </Button>
      <h1>List</h1>

      {recipes.length !== 0 && (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>{JSON.stringify(recipe)}</li>
          ))}
        </ul>
      )}
    </ChakraProvider>
  );
};

export default FavouriteList;
