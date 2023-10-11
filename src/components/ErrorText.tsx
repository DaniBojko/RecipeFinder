import { PiWarningDuotone } from "react-icons/pi";
import { Icon } from "@chakra-ui/icons";
import { Center, HStack, Text } from "@chakra-ui/react";

interface Props {
  children: string;
}

const ErrorText = ({ children }: Props) => {
  const color = "#c2001d";
  return (
    <HStack>
      <Center>
        <Icon boxSize="15px" as={PiWarningDuotone} color={color} />
      </Center>

      <Text fontSize="16px" marginBottom="2px" color={color}>
        {children}
      </Text>
    </HStack>
  );
};

export default ErrorText;
