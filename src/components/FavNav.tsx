import { Button, Spacer } from "@chakra-ui/react";
import SearchBarChange from "./SearchBarChange";
import { useNavigate } from "react-router-dom";
import uselogOut from "../hooks/useLogout";
import NavBarWrapper from "./Wrappers/NavBarWrapper";

interface Props {
  onChange: (query: string) => void;
}

const FavNav = ({ onChange }: Props) => {
  const navigate = useNavigate();
  const logout = uselogOut();
  return (
    <NavBarWrapper>
      <Button colorScheme="orange" variant="solid" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Spacer />

      <SearchBarChange onChange={(query) => onChange(query)}></SearchBarChange>

      <Spacer />

      <Button colorScheme="orange" onClick={() => logout()}>
        Log out
      </Button>
    </NavBarWrapper>
  );
};

export default FavNav;
