import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";

interface Props {
  onClick: (link: string) => void;
}

const NavBar = ({ onClick }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex>
      <FilterDrawer onClick={(str) => onClick(str)} />

      <Spacer />
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate("/login")}
      >
        Log in
      </Button>
    </Flex>
  );
};

export default NavBar;
