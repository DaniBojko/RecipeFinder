import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Select from "react-select";
import { diets, ingredients, intolerances } from "../assets/StaticData";
import { useRef, useState } from "react";
import { requestLinkBuilder } from "../services/requestLinkBuilder";

export interface ReactSelectData {
  value: string;
  label: string;
}

export interface FilterObject {
  diets: ReactSelectData[];
  intolerances: ReactSelectData[];
  ingredients: ReactSelectData[];
}

interface Props {
  onClick: (link: string) => void;
}

const FilterDrawer = ({ onClick }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const [filter, updateFilter] = useState<FilterObject>({
    diets: [],
    intolerances: [],
    ingredients: [],
  });
  const link = requestLinkBuilder(filter);

  const handleClick = () => {
    onClick(link);
  };

  return (
    <>
      <IconButton
        colorScheme="teal"
        ref={btnRef}
        variant="ghost"
        aria-label="Ingredient list"
        icon={<AddIcon />}
        onClick={onOpen}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Select
              options={ingredients}
              isMulti
              defaultValue={filter.ingredients}
              onChange={(data) => {
                updateFilter({
                  ...filter,
                  ingredients: data as ReactSelectData[],
                });
              }}
            />
            <Select
              options={diets}
              isMulti
              defaultValue={filter?.diets}
              onChange={(data) => {
                updateFilter({ ...filter, diets: data as ReactSelectData[] });
              }}
            />
            <Select
              options={intolerances}
              isMulti
              defaultValue={filter.intolerances}
              onChange={(data) => {
                updateFilter({
                  ...filter,
                  intolerances: data as ReactSelectData[],
                });
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                updateFilter({
                  diets: [],
                  intolerances: [],
                  ingredients: [],
                });
              }}
            >
              Discard
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleClick();
                onClose();
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
