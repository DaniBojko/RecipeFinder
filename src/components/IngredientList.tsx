import { Button } from "@chakra-ui/react";
import { Ingredient } from "../components/MainPage";
import ListItem from "./ListItem";

interface Props {
  ingredients: Ingredient[];
  deleteIngredient: (id: number) => void;
}

const IngredientList = ({ ingredients, deleteIngredient }: Props) => {
  return (
    <>
      {ingredients.length > 0 && (
        <Button
          marginTop="10px"
          width="100%"
          colorScheme="red"
          variant="solid"
          onClick={() => deleteIngredient(-1)}
        >
          Delete all
        </Button>
      )}

      <ul className="list-group list-group-flush">
        {ingredients.map((ingredient) => (
          <ListItem
            key={ingredient.id}
            item={ingredient}
            onDelete={(id) => deleteIngredient(id)}
          ></ListItem>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
