import { Flex } from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}

const GridWrapper = ({ children }: Props) => {
  return (
    <Flex
      justifyContent="center"
      padding="20px"
      //backgroundImage="linear-gradient(to bottom,#fff 1.5%,#f0f9f9 5.5%)"
    >
      {children}
    </Flex>
  );
};

export default GridWrapper;
