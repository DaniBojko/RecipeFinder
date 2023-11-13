import {
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
import NavBarWrapper from "./Wrappers/NavBarWrapper";
import uselogOut from "../hooks/useLogout";
import { IoLogInSharp } from "react-icons/io5";

interface Props {
  onClick: (data: object) => void;
}

const NavBar = ({ onClick }: Props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = uselogOut();
  const hasAuthorized = Object.keys(auth).length !== 0;

  return (
    <NavBarWrapper>
      <FilterDrawer onClick={(data) => onClick({ filter: data })} />
      <Spacer />

      <SearchBar onSubmit={(data) => onClick({ query: data })} />

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
                logout();
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <IconButton
          colorScheme="orange"
          aria-label="Log in"
          icon={<IoLogInSharp />}
          onClick={() => navigate("/login")}
        />
      )}
    </NavBarWrapper>
  );
};

export default NavBar;
