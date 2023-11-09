import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import useBackEndPrivate from "../hooks/useBackEndPrivate";
import { useNavigate, useLocation } from "react-router-dom";

type Response = {
  email: string;
  password: string;
  refreshtoken: string;
};

const FavouriteList = () => {
  const [recipes, setRecipes] = useState<Response[]>([]);
  const backEndPrivate = useBackEndPrivate();
  const navigate = useNavigate();
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
  }, []);

  return (
    <>
      <h1>List</h1>

      {recipes.length !== 0 && (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>{recipe.email}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FavouriteList;
