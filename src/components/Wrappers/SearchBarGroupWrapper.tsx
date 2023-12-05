import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}
const SearchBarGroupWrapper = ({ children }: Props) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" fontSize="1.2em" color="gray.500">
        <SearchIcon />
      </InputLeftElement>
      {children}
    </InputGroup>
  );
};

export default SearchBarGroupWrapper;
