import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";
import { colorPalette } from "../assets/StyleVariables";
import SearchBarSubmit from "./SearchBarSubmit";
import useAuth from "../hooks/useAuth";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavBarWrapper from "./Wrappers/NavBarWrapper";
import uselogOut from "../hooks/useLogout";
import { IoLogInSharp } from "react-icons/io5";
import SearchBarChange from "./SearchBarChange";

interface Props {
  onChange?: (str: string) => void;
}

const NavBar = ({ onChange = undefined }: Props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = uselogOut();
  const location = useLocation();
  const hasAuthorized = Object.keys(auth).length !== 0;

  console.log(location.pathname);

  return (
    <NavBarWrapper>
      {location.pathname === "/favourites" ? (
        <>
          <Button
            colorScheme="orange"
            variant="solid"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Spacer />

          <SearchBarChange
            onChange={(query) => onChange && onChange(query)}
          ></SearchBarChange>

          <Spacer />

          <Button colorScheme="orange" onClick={() => logout()}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <FilterDrawer />
          <Spacer />

          <SearchBarSubmit />
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
              onClick={() =>
                navigate("/login", { state: { from: location }, replace: true })
              }
            />
          )}
        </>
      )}
    </NavBarWrapper>
  );
};

export default NavBar;
