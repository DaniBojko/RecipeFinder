import { Box, Flex } from "@chakra-ui/react";
import { colorPalette } from "../../assets/StyleVariables";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const NavBarWrapper = ({ children }: Props) => {
  return (
    <Box position="sticky" top="0" zIndex="999">
      <Flex
        padding="20px"
        alignItems="center"
        backgroundColor="#fff"
        borderBottom={`1px solid ${colorPalette.secondary}`}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default NavBarWrapper;
