import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Spacer } from "@chakra-ui/react";
import GridWrapper from "./Wrappers/GridWrapper";
import useAuth from "../hooks/useAuth";

interface Props {
  currentPage: number;
  maxPages: number;
}

const PageFlipper = ({ currentPage, maxPages }: Props) => {
  const { setSearchParams } = useAuth();

  return (
    <GridWrapper>
      <HStack marginTop="2rem">
        <IconButton
          aria-label="Previous page"
          colorScheme="orange"
          isDisabled={currentPage <= 0}
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("page", `${currentPage - 1}`);
              return prev;
            });
          }}
          icon={<ArrowBackIcon />}
        ></IconButton>
        <Spacer />
        <IconButton
          aria-label="Next page"
          colorScheme="orange"
          isDisabled={currentPage >= maxPages}
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("page", `${currentPage + 1}`);
              return prev;
            });
          }}
          icon={<ArrowForwardIcon />}
        ></IconButton>
      </HStack>
    </GridWrapper>
  );
};

export default PageFlipper;
