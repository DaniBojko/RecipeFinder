import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { FormEvent, useRef } from "react";

interface Props {
  addIngredient: (item: string) => void;
}

const IngredientSearcher = ({ addIngredient }: Props) => {
  const itemRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (itemRef.current != null) {
      addIngredient(itemRef.current?.value);
      itemRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          ref={itemRef}
          variant="filled"
          placeholder="Search ingrediens..."
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
  );
};

export default IngredientSearcher;
