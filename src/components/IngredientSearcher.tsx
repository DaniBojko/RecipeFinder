import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import ListItem from "./ListItem";
import { FormEvent, useRef } from "react";

import { Ingredient } from "../App";

interface Props {
  ingredients: Ingredient[];
  deleteIngredient: (id: number) => void;
  addIngredient: (item: string) => void;
}

const IngredientSearcher = ({
  ingredients,
  deleteIngredient,
  addIngredient,
}: Props) => {
  const itemRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (itemRef.current != null) {
      addIngredient(itemRef.current?.value);
      itemRef.current.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            ref={itemRef}
            variant="filled"
            placeholder="Hozzavalok keresese..."
          />
          <InputRightElement>
            <IconButton
              variant="ghost"
              type="submit"
              colorScheme="green"
              aria-label="Delete ingredient"
              icon={<MdAdd />}
              _hover={{ bg: "#ceedda" }}
            />
          </InputRightElement>
        </InputGroup>
      </form>
      {ingredients.length > 0 && (
        <Button
          marginTop="10px"
          width="100%"
          colorScheme="red"
          variant="solid"
          onClick={() => deleteIngredient(-1)}
        >
          Összes törlése
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

export default IngredientSearcher;
