import { Box, Text } from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";

interface Props {
  children: string;
}

const DrawerText = ({ children }: Props) => {
  return (
    <Box marginBottom="10px">
      <Text
        fontWeight="semibold"
        display="inline"
        fontSize="lg"
        color={colorPalette.accent}
        borderBottom={`3px solid ${colorPalette.primary}`}
      >
        {children}
      </Text>
    </Box>
  );
};

export default DrawerText;
