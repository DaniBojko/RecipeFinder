import { Card, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { Ingredient } from "./MainPage";
import { AddIcon } from "@chakra-ui/icons";

interface Props {
  query: string;
  data: Ingredient[];
  action: (item: Ingredient) => void;
}

const MAX_SEARCH_RESULT = 5;

const filter = (array: Ingredient[], query: string) => {
  const items = [];
  for (const value of array) {
    if (value.name.indexOf(query) != -1) items.push(value);
    if (items.length === MAX_SEARCH_RESULT) break;
  }
  return items;
};

function SearchResults({ query, data, action }: Props) {
  const result = filter(data, query);

  return (
    <Card marginTop="5px" w="100%" position="absolute" zIndex={99}>
      <ul className="list-group list-group-flush">
        {result.map((res) => (
          <li
            key={res.id}
            className="list-group-item hover"
            onClick={() => action({ name: res.name, id: res.id })}
          >
            <HStack>
              <Text margin={0}>{res.name}</Text>
              <Spacer />
              <Icon as={AddIcon} color="green.500" />
            </HStack>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SearchResults;
