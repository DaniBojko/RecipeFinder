import { Center, Container } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const FormWrapper = ({ children }: Props) => {
  return (
    <Center h="100vh">
      <Container
        maxW="50ch"
        paddingX="50px"
        paddingY="20px"
        borderRadius="15px"
      >
        {children}
      </Container>
    </Center>
  );
};

export default FormWrapper;
