import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";
import { colorPalette } from "../assets/StyleVariables";

interface Props {
  onClick: (link: string) => void;
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
      <FilterDrawer onClick={(str) => onClick(str)} />

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
