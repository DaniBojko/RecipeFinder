import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Spacer } from "@chakra-ui/react";
import GridWrapper from "./Wrappers/GridWrapper";

interface Props {
  maxPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const PageFlipper = ({ maxPages, currentPage, onClick }: Props) => {
  return (
    <GridWrapper>
      <HStack marginTop="2rem">
        <IconButton
          aria-label="Previous page"
          colorScheme="orange"
          isDisabled={currentPage === 0}
          onClick={() => {
            onClick(currentPage - 1);
          }}
          icon={<ArrowBackIcon />}
        ></IconButton>
        <Spacer />
        <IconButton
          aria-label="Next page"
          colorScheme="orange"
          isDisabled={currentPage === maxPages}
          onClick={() => {
            onClick(currentPage + 1);
          }}
          icon={<ArrowForwardIcon />}
        ></IconButton>
      </HStack>
    </GridWrapper>
  );
};

export default PageFlipper;
