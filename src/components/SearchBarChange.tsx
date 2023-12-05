import { Input } from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";
import SearchBarWrapper from "./Wrappers/SearchBarWrapper";
import SearchBarGroupWrapper from "./Wrappers/SearchBarGroupWrapper";

interface Props {
  onChange: (query: string) => void;
}

const SearchBarChange = ({ onChange }: Props) => {
  return (
    <SearchBarWrapper>
      <SearchBarGroupWrapper>
        <Input
          name="search"
          type="text"
          placeholder="Search recipes..."
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          _focusVisible={{
            border: `2px solid ${colorPalette.primary}`,
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </SearchBarGroupWrapper>
    </SearchBarWrapper>
  );
};

export default SearchBarChange;
