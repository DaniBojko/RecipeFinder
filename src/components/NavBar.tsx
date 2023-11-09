import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";
import { colorPalette } from "../assets/StyleVariables";
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";
import { HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  onClick: (data: object) => void;
}

const NavBar = ({ onClick }: Props) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const hasAuthorized = Object.keys(auth).length !== 0;

  return (
    <Flex
      padding="20px"
      alignItems="center"
      backgroundColor="#fff"
      borderBottom={`1px solid ${colorPalette.secondary}`}
    >
      <FilterDrawer onClick={(data) => onClick({ filter: data })} />
      <Spacer />
      <SearchBar onClick={(data) => onClick({ query: data })} />
      <Spacer />

      {hasAuthorized ? (
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="solid"
            colorScheme="orange"
          />
          <MenuList>
            <MenuItem
              _focus={{ backgroundColor: colorPalette.secondaryLight }}
              onClick={() => navigate("/favourites")}
            >
              Favourites list
            </MenuItem>
            <MenuItem
              _focus={{ backgroundColor: colorPalette.secondaryLight }}
              onClick={() => {
                setAuth({});
                navigate("/");
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          colorScheme="orange"
          variant="solid"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
