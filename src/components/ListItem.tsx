import { HStack, Text, IconButton, Spacer } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { Ingredient } from "../components/MainPage";

interface Props {
  item: Ingredient;
  onDelete: (id: number) => void;
}

const ListItem = ({ item, onDelete }: Props) => {
  return (
    <li className="list-group-item">
      <HStack>
        <Text margin={0}>{item.name}</Text>
        <Spacer />
        <IconButton
          variant="ghost"
          colorScheme="red"
          aria-label="Delete ingredient"
          icon={<MdDeleteOutline />}
          onClick={() => onDelete(item.id)}
          _hover={{ bg: "#ffd4d1" }}
        />
      </HStack>
    </li>
  );
};

export default ListItem;
