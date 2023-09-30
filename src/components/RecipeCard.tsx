import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
} from "@chakra-ui/react";
import { Recipe } from "./RecipeList";
import { normalizeImage } from "../services/normalizeImage";

function RecipeCard(recipe: Recipe) {
  return (
    <Card variant="filled" overflow="hidden">
      <Image
        className="img"
        objectFit="cover"
        height="200px"
        src={normalizeImage(recipe.image, recipe.imageType)}
      />

      <CardBody>
        <Heading fontSize="xl">{recipe.title}</Heading>
      </CardBody>
      <CardFooter>Icons here</CardFooter>
    </Card>
  );
}

export default RecipeCard;
