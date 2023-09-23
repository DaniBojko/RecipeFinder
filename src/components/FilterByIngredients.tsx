import IngredientList from "./IngredientList";

import { Ingredient } from "../components/MainPage";
import IngredientSearcher from "./IngredientSearcher";

interface Props {
  ingredients: Ingredient[];
  deleteIngredient: (id: number) => void;
  addIngredient: (item: string) => void;
}

const FilterByIngredients = ({
  ingredients,
  deleteIngredient,
  addIngredient,
}: Props) => {
  return (
    <>
      <IngredientSearcher addIngredient={addIngredient} />
      <IngredientList
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
      ></IngredientList>
    </>
  );
};

export default FilterByIngredients;
