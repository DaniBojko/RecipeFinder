import { Input } from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";
import { useRef } from "react";
import SearchBarWrapper from "./Wrappers/SearchBarWrapper";
import useAuth from "../hooks/useAuth";
import SearchBarGroupWrapper from "./Wrappers/SearchBarGroupWrapper";

const SearchBarSubmit = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const { searchParams, setSearchParams } = useAuth();
  const query = searchParams.get("search") || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("asd");
    e.preventDefault();
    setSearchParams((prev) => {
      prev.set("search", searchBarRef.current?.value || "");
      prev.set("page", "0");
      return prev;
    });
    if (searchBarRef.current !== null) {
      searchBarRef.current.blur();
    }
  };

  return (
    <SearchBarWrapper>
      <form onSubmit={handleSubmit}>
        <SearchBarGroupWrapper>
          <Input
            ref={searchBarRef}
            key={query}
            name="search"
            type="text"
            placeholder="Search recipes..."
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            defaultValue={query}
            _focusVisible={{
              border: `2px solid ${colorPalette.primary}`,
            }}
          />
        </SearchBarGroupWrapper>
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBarSubmit;
