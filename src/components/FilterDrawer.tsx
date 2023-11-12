import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  diets,
  ingredients,
  intolerances,
  mealTypes,
} from "../assets/StaticData";
import { useRef, useState } from "react";
import {
  colorPalette,
  reactMultiSelectStyles,
  reactSingleSelectStyles,
} from "../assets/StyleVariables";
import DrawerText from "./DrawerText";
import RangeSelect from "./RangeSelect";
import { filterBuilder } from "../services/filterBuilder";

const marginBottom = "20px";

export interface ReactSelectData {
  value: string;
  label: string;
}
export interface Range {
  rangeStart: number;
  rangeEnd: number;
}

export interface FilterObject {
  diets: ReactSelectData[];
  intolerances: ReactSelectData[];
  ingredients: ReactSelectData[];
  mealType: ReactSelectData;
  calorieRange: Range;
  carbRange: Range;
  proteinRange: Range;
  fatRange: Range;
}

interface Props {
  onClick: (data: string) => void;
}

const FilterDrawer = ({ onClick }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const calorieRange = [0, 1500];
  const carbRange = [0, 300];
  const proteinRange = [0, 100];
  const fatRange = [0, 100];
  const [filter, updateFilter] = useState<FilterObject>({
    diets: [],
    intolerances: [],
    ingredients: [],
    mealType: { value: "", label: "" },
    calorieRange: { rangeStart: calorieRange[0], rangeEnd: calorieRange[1] },
    carbRange: { rangeStart: carbRange[0], rangeEnd: carbRange[1] },
    proteinRange: { rangeStart: proteinRange[0], rangeEnd: proteinRange[1] },
    fatRange: { rangeStart: fatRange[0], rangeEnd: fatRange[1] },
  });

  const handleClick = () => {
    onClick(filterBuilder(filter));
  };

  return (
    <>
      <Button
        colorScheme="orange"
        ref={btnRef}
        variant="solid"
        onClick={onOpen}
      >
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundImage="radial-gradient(circle, #fecd45, #f3b134, #e69526, #d8791c, #c85d16)">
          <DrawerCloseButton color="#fff" />
          <DrawerHeader fontSize="2xl" marginY="10px" color="#fff">
            Filter recipes
          </DrawerHeader>
          <DrawerBody backgroundColor="#fff">
            <Box marginTop="15px" marginBottom={marginBottom}>
              <DrawerText>Ingredients</DrawerText>
              <Select
                options={ingredients}
                isMulti
                defaultValue={filter.ingredients}
                styles={reactMultiSelectStyles}
                onChange={(data) => {
                  updateFilter({
                    ...filter,
                    ingredients: data as ReactSelectData[],
                  });
                }}
              />
            </Box>
            <Box marginBottom={marginBottom}>
              <DrawerText>Diets</DrawerText>
              <Select
                options={diets}
                isMulti
                defaultValue={filter.diets}
                styles={reactMultiSelectStyles}
                onChange={(data) => {
                  updateFilter({
                    ...filter,
                    diets: data as ReactSelectData[],
                  });
                }}
              />
            </Box>
            <Box marginBottom={marginBottom}>
              <DrawerText>Intolerances</DrawerText>
              <Select
                options={intolerances}
                isMulti
                defaultValue={filter.intolerances}
                styles={reactMultiSelectStyles}
                onChange={(data) => {
                  updateFilter({
                    ...filter,
                    intolerances: data as ReactSelectData[],
                  });
                }}
              />
            </Box>

            <Box marginBottom={marginBottom}>
              <DrawerText>Meal type</DrawerText>
              <Select
                options={mealTypes}
                defaultValue={filter.mealType}
                isClearable
                styles={reactSingleSelectStyles}
                onChange={(data) => {
                  updateFilter({
                    ...filter,
                    mealType: data as ReactSelectData,
                  });
                }}
              />
            </Box>

            <Box marginBottom={marginBottom}>
              <DrawerText>Calories</DrawerText>
              <RangeSelect
                rangeStart={calorieRange[0]}
                rangeEnd={calorieRange[1]}
                step={50}
                value={filter.calorieRange}
                onChange={(data: Range) => {
                  updateFilter((prevState) => ({
                    ...prevState,
                    calorieRange: data,
                  }));
                }}
              />
            </Box>

            <Box marginBottom={marginBottom}>
              <DrawerText>Carbs</DrawerText>
              <RangeSelect
                rangeStart={carbRange[0]}
                rangeEnd={carbRange[1]}
                value={filter.carbRange}
                onChange={(data: Range) => {
                  updateFilter((prevState) => ({
                    ...prevState,
                    carbRange: data,
                  }));
                }}
              />
            </Box>

            <Box marginBottom={marginBottom}>
              <DrawerText>Protein</DrawerText>
              <RangeSelect
                rangeStart={proteinRange[0]}
                rangeEnd={proteinRange[1]}
                value={filter.proteinRange}
                onChange={(data: Range) => {
                  updateFilter((prevState) => ({
                    ...prevState,
                    proteinRange: data,
                  }));
                }}
              />
            </Box>

            <Box marginBottom={marginBottom}>
              <DrawerText>Fat</DrawerText>
              <RangeSelect
                rangeStart={fatRange[0]}
                rangeEnd={fatRange[1]}
                value={filter.fatRange}
                onChange={(data: Range) => {
                  updateFilter((prevState) => ({
                    ...prevState,
                    fatRange: data,
                  }));
                }}
              />
            </Box>
          </DrawerBody>

          <DrawerFooter
            backgroundColor="#fff"
            borderTop={`1px solid ${colorPalette.primary}`}
          >
            <Button
              width="100%"
              variant="solid"
              colorScheme="orange"
              onClick={() => {
                handleClick();
                onClose();
              }}
            >
              Save changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
