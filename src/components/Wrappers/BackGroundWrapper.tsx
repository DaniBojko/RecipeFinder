import { Box } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const BackGroundWrapper = ({ children }: Props) => {
  return (
    <Box
      backgroundImage="linear-gradient(to bottom,#fff 1.5%,#f0f9f9 5.5%)"
      minH="100vh"
    >
      {children}
    </Box>
  );
};

export default BackGroundWrapper;
