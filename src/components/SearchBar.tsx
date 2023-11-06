import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { colorPalette } from "../assets/StyleVariables";

interface Props {
  onClick: (data: string) => void;
}

const SearchBar = ({ onClick }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box width="50%" marginX="10px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchValue) onClick(`&query=${searchValue}`);
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            fontSize="1.2em"
            color="gray.500"
          >
            <SearchIcon />
          </InputLeftElement>
          <Input
            variant="filled"
            value={searchValue}
            placeholder="Search recipes..."
            _focusVisible={{
              boxShadow: "0",
              border: `2px solid ${colorPalette.primary}`,
              backgroundColor: "white",
            }}
            onChange={(value) => setSearchValue(value.target.value)}
          />
          {searchValue && (
            <InputRightElement pointerEvents="all">
              <SmallCloseIcon
                cursor="pointer"
                onClick={() => {
                  setSearchValue("");
                }}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;
