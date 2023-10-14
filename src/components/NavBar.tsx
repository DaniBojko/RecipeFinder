import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";
import { colorPalette } from "../assets/StyleVariables";
import SearchBar from "./SearchBar";

interface Props {
  onClick: (data: object) => void;
}

const NavBar = ({ onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Flex
      padding="20px"
      alignItems="center"
      height="10vh"
      backgroundColor="#fff"
      borderBottom={`1px solid ${colorPalette.secondary}`}
    >
      <FilterDrawer onClick={(data) => onClick({ filter: data })} />
      <Spacer />
      <SearchBar onClick={(data) => onClick({ query: data })} />
      <Spacer />
      <Button
        colorScheme="orange"
        variant="solid"
        onClick={() => navigate("/login")}
      >
        Log in
      </Button>
    </Flex>
  );
};

export default NavBar;
