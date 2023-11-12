import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";
import { useRef, useState } from "react";
import SearchBarWrapper from "./Wrappers/SearchBarWrapper";

interface Props {
  onSubmit: (query: string) => void;
  onChange?: boolean;
}

const SearchBar = ({ onSubmit, onChange = false }: Props) => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <SearchBarWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!onChange) {
            onSubmit(query);
            !isSubmitted && setIsSubmitted(true);
            if (searchBarRef.current !== null) {
              searchBarRef.current.blur();
            }
          }
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
            name="search"
            ref={searchBarRef}
            variant="filled"
            type="text"
            placeholder="Search recipes..."
            value={query}
            _focusVisible={{
              boxShadow: "0",
              border: `2px solid ${colorPalette.primary}`,
              backgroundColor: "white",
            }}
            onChange={(query) => {
              setQuery(query.target.value);
              onChange && onSubmit(query.target.value);
            }}
          />
          {((onChange && query.length > 0) || isSubmitted) && (
            <InputRightElement pointerEvents="all">
              <SmallCloseIcon
                cursor="pointer"
                onClick={() => {
                  setQuery("");
                  isSubmitted && setIsSubmitted(false);
                  onSubmit("");
                }}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBar;
