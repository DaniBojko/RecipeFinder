import { Heading } from "@chakra-ui/react";

interface Props {
  children: string;
}

const CardHeading = ({ children }: Props) => {
  return (
    <Heading
      margin="0"
      color="#222"
      fontFamily="Frank Ruhl Libre, serif"
      fontWeight="400"
      fontSize="1.75rem"
    >
      {children}
    </Heading>
  );
};

export default CardHeading;
