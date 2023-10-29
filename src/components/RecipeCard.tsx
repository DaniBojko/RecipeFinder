import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { GoStopwatch } from "react-icons/go";
import { Recipe } from "../hooks/useRecipes";
import { normalizeImage } from "../services/normalizeImage";
import { colorPalette } from "../assets/StyleVariables";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";
import { useState } from "react";

function RecipeCard(recipe: Recipe) {
  const [isFavourite, setFavourite] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="card"
      variant="outline"
      border="0"
      boxShadow="0"
      overflow="hidden"
      maxWidth={{ sm: "350px", xl: "275px" }}
      borderRadius="0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = recipe.sourceUrl)}
    >
      <Box overflow="hidden">
        {hover && (
          <Flex
            width="100%"
            padding="10px"
            position="absolute"
            justify="flex-end"
          >
            <Icon
              _hover={{}}
              position="relative"
              cursor="pointer"
              boxSize="48px"
              opacity="1"
              zIndex={1}
              color={colorPalette.primary}
              as={isFavourite ? PiHeartFill : PiHeartDuotone}
              onClick={(e) => {
                e.stopPropagation();
                setFavourite(!isFavourite);
              }}
            />
          </Flex>
        )}
        <Image
          className="img"
          src={normalizeImage(recipe.image, recipe.imageType)}
        />
      </Box>

      <CardFooter paddingY="0" marginTop="1.25rem">
        {recipe.readyInMinutes != null && (
          <HStack color={colorPalette.accent} gap="0.2rem">
            <Icon boxSize="17px" as={GoStopwatch} />
            <Text fontSize="1rem" letterSpacing="-1px" margin="0">
              {recipe.readyInMinutes} mins
            </Text>
          </HStack>
        )}
      </CardFooter>

      <CardBody minH="100px">
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
    </Card>
  );
}

export default RecipeCard;
