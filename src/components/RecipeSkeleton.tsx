import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const RecipeSkeleton = () => {
  return (
    <Card
      variant="outline"
      border="0"
      boxShadow="0"
      overflow="hidden"
      width={{ sm: "350px", xl: "275px" }}
      borderRadius="0"
    >
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText minH="100px" />
      </CardBody>
    </Card>
  );
};

export default RecipeSkeleton;
