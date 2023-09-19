import { Hide, Button, Flex, Spacer, IconButton } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

interface Props {
  state: {
    componentState: number;
    updateComponentState: (n: number) => void;
  };
}

const NavBar = ({ state }: Props) => {
  return (
    <Flex>
      <Hide above="md">
        <IconButton
          colorScheme="teal"
          variant="ghost"
          aria-label="Ingredient list"
          icon={state.componentState % 2 ? <CloseIcon /> : <AddIcon />}
          onClick={() => state.updateComponentState(state.componentState + 1)}
        ></IconButton>
      </Hide>
      <Spacer />
      <Button colorScheme="teal" variant="solid" onClick={() => alert("login")}>
        Log in
      </Button>
    </Flex>
  );
};

export default NavBar;
