import {
  Box,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { GoStopwatch } from "react-icons/go";
import { Recipe } from "./RecipeGrid";
import { normalizeImage } from "../services/normalizeImage";
import { colorPalette } from "../assets/StyleVariables";

function RecipeCard(recipe: Recipe) {
  return (
    <Card
      className="card"
      variant="outline"
      border="0"
      boxShadow="0"
      overflow="hidden"
      maxWidth={{ sm: "350px", xl: "275px" }}
      borderRadius="0"
    >
      <Box overflow="hidden">
        <Image
          className="img"
          src={normalizeImage(recipe.image, recipe.imageType)}
        />
      </Box>

      <CardBody minH="100px" paddingY="0" marginTop="1rem">
        <Heading
          margin="0"
          color="#222"
          fontFamily="Frank Ruhl Libre, serif"
          fontWeight="400"
          fontSize="1.75rem"
        >
          {recipe.title}
        </Heading>
      </CardBody>
      <CardFooter paddingY="0" marginY="1rem">
        {recipe.readyInMinutes != null && (
          <HStack color={colorPalette.accent} gap="0.2rem">
            <Icon boxSize="17px" as={GoStopwatch} />
            <Text fontSize="1rem" letterSpacing="-1px" margin="0">
              {recipe.readyInMinutes} mins
            </Text>
          </HStack>
        )}
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
