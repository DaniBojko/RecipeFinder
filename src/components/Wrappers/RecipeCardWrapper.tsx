import { Card } from "@chakra-ui/react";
import { colorPalette } from "../../assets/StyleVariables";

interface Props {
  children: JSX.Element | JSX.Element[];
  skeleton?: boolean;
}
const RecipeCardWrapper = ({ children, skeleton = false }: Props) => {
  return (
    <Card
      overflow="hidden"
      zIndex={1}
      width={{ sm: "350px", xl: "275px" }}
      borderRadius="0"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      _hover={
        skeleton
          ? {}
          : {
              translate: "0px -3px",
              boxShadow: `0px 0px 0px 3px ${colorPalette.secondary}`,
              cursor: "pointer",
            }
      }
    >
      {children}
    </Card>
  );
};

export default RecipeCardWrapper;
