import { HStack, Text, IconButton } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  id: number;
  item: string;
  onDelete: (id: number) => void;
}

const ListItem = ({ id, item, onDelete }: Props) => {
  return (
    <li className="list-group-item">
      <HStack justify="space-between">
        <Text margin={0}>{item}</Text>
        <IconButton
          variant="ghost"
          colorScheme="red"
          aria-label="Delete ingredient"
          icon={<MdDeleteOutline />}
          onClick={() => onDelete(id)}
          _hover={{ bg: "#ffd4d1" }}
        />
      </HStack>
    </li>
  );
};

export default ListItem;
