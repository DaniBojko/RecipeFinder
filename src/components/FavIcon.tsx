import { Flex, Icon } from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";
import { GoHeart, GoHeartFill } from "react-icons/go";
interface Props {
  isFavourite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const FavIcon = ({ isFavourite, onClick }: Props) => {
  return (
    <Flex width="100%" padding="10px" position="absolute" justify="flex-end">
      <Icon
        position="relative"
        cursor="pointer"
        boxSize="48px"
        opacity="1"
        zIndex={10}
        color={colorPalette.primary}
        as={isFavourite ? GoHeartFill : GoHeart}
        onClick={onClick}
      />
    </Flex>
  );
};

export default FavIcon;
