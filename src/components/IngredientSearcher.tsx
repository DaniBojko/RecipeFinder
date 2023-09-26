import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { Ingredient } from "./MainPage";
import { SearchIcon } from "@chakra-ui/icons";

import { MdOutlineClose } from "react-icons/md";

const tmp = [
  { name: "vaj", id: 1 },
  { name: "sajt", id: 2 },
  { name: "kolbasz", id: 3 },
  { name: "asd", id: 4 },
  { name: "gec", id: 5 },
  { name: "hop", id: 6 },
  { name: "hej", id: 7 },
  { name: "yoo", id: 8 },
  { name: "valami", id: 9 },
  { name: "valami", id: 19 },
  { name: "valami", id: 29 },
  { name: "valami", id: 39 },
  { name: "valami", id: 49 },
  { name: "valami", id: 59 },
  { name: "valami", id: 69 },
  { name: "valami", id: 79 },
  { name: "valami", id: 89 },
  { name: "valami", id: 99 },
];

interface Props {
  addIngredient: (item: Ingredient) => void;
}

const IngredientSearcher = ({ addIngredient }: Props) => {
  const [query, setQuery] = useState("");
  const [isBlurred, setBlur] = useState(false);
  const itemRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (item: Ingredient) => {
    if (query != "") {
      addIngredient(item);
      setQuery("");
      console.log("Ing Src: " + item);
      if (itemRef.current != null) itemRef.current.focus();
    }
  };

  let cnt = useRef(1);

  useEffect(() => {
    console.log(cnt.current);
    cnt.current++;
  });

  return (
    <div
      className="relative"
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setBlur(true);
        }
      }}
    >
      <InputGroup>
        <Input
          value={query}
          ref={itemRef}
          variant="filled"
          placeholder="Search for ingrediens..."
          onFocus={() => setBlur(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputRightElement pointerEvents={query ? "all" : "none"}>
          {query ? (
            <Icon
              onClick={() => {
                setQuery("");
                if (itemRef.current != null) itemRef.current.focus();
              }}
              cursor="pointer"
              as={MdOutlineClose}
            />
          ) : (
            <Icon as={SearchIcon} />
          )}
        </InputRightElement>
      </InputGroup>
      {query.length > 1 && !isBlurred && (
        <SearchResults query={query} data={tmp} action={handleSubmit} />
      )}
    </div>
  );
};

export default IngredientSearcher;
