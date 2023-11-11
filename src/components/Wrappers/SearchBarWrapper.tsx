import { Box } from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}
const SearchBarWrapper = ({ children }: Props) => {
  return (
    <Box width="50%" marginX="10px">
      {children}
    </Box>
  );
};

export default SearchBarWrapper;
