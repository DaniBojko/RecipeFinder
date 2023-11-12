import { WarningIcon } from "@chakra-ui/icons";
import { Center, HStack, Text } from "@chakra-ui/react";

interface Props {
  children: string;
}

const ErrorText = ({ children }: Props) => {
  const color = "#c2001d";
  if (!children) return;
  return (
    <HStack>
      <Center>
        <WarningIcon boxSize="15px" color={color} />
      </Center>

      <Text fontSize="16px" marginBottom="2px" color={color}>
        {children}
      </Text>
    </HStack>
  );
};

export default ErrorText;
