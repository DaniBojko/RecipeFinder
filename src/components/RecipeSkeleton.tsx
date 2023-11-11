import { CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import RecipeCardWrapper from "./Wrappers/RecipeCardWrapper";

const RecipeSkeleton = () => {
  return (
    <RecipeCardWrapper skeleton>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText minH="100px" />
      </CardBody>
    </RecipeCardWrapper>
  );
};

export default RecipeSkeleton;
