import { Flex, Icon } from "@chakra-ui/react";
import { colorPalette } from "../assets/StyleVariables";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";

interface Props {
  isFavourite: boolean;
  onClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const FavIcon = ({ isFavourite, onClick }: Props) => {
  return (
    <Flex width="100%" padding="10px" position="absolute" justify="flex-end">
      <Icon
        position="relative"
        cursor="pointer"
        boxSize="48px"
        opacity="1"
        zIndex={1}
        color={colorPalette.primary}
        as={isFavourite ? PiHeartFill : PiHeartDuotone}
        onClick={onClick}
      />
    </Flex>
  );
};

export default FavIcon;
