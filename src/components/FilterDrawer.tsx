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
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Select, { MultiValue, SingleValue } from "react-select";
import {
  diets,
  ingredients,
  intolerances,
  mealTypes,
} from "../assets/LocalData";
import { useRef, useState } from "react";
import {
  colorPalette,
  reactMultiSelectStyles,
  reactSingleSelectStyles,
} from "../assets/StyleVariables";
import DrawerText from "./DrawerText";
import RangeSelect from "./RangeSelect";
import { IoFilterSharp } from "react-icons/io5";
import { filterBuilder } from "../services/filterBuilder";
import useAuth from "../hooks/useAuth";

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
  ingredients: MultiValue<ReactSelectData>;
  diets: MultiValue<ReactSelectData>;
  intolerances: MultiValue<ReactSelectData>;
  mealType: SingleValue<ReactSelectData>;
  calorieRange: Range;
  carbRange: Range;
  proteinRange: Range;
  fatRange: Range;
}

const FilterDrawer = () => {
  const calorieRange = [0, 1500];
  const carbRange = [0, 300];
  const proteinRange = [0, 100];
  const fatRange = [0, 100];
  const btnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchParams, setSearchParams } = useAuth();
  const params = new URLSearchParams(searchParams.get("filter") || "");
  const mealType = params.get("type");
  const [filter, updateFilter] = useState<FilterObject>({
    ingredients:
      params
        .get("includeIngredients")
        ?.split(",")
        .map((d) => ({
          label: d.charAt(0).toUpperCase() + d.slice(1),
          value: d,
        })) || [],
    diets:
      params
        .get("diet")
        ?.split("|")
        .map((d) => ({
          label: d.charAt(0).toUpperCase() + d.slice(1),
          value: d,
        })) || [],
    intolerances:
      params
        .get("intolerances")
        ?.split(",")
        .map((d) => ({
          label: d.charAt(0).toUpperCase() + d.slice(1),
          value: d,
        })) || [],
    mealType: mealType
      ? {
          value: mealType,
          label: mealType.charAt(0).toUpperCase() + mealType.slice(1),
        }
      : null,
    calorieRange: {
      rangeStart: parseInt(
        params.get("minCalories") || calorieRange[0].toString()
      ),
      rangeEnd: parseInt(
        params.get("maxCalories") || calorieRange[1].toString()
      ),
    },
    carbRange: {
      rangeStart: parseInt(params.get("minCarbs") || carbRange[0].toString()),
      rangeEnd: parseInt(params.get("maxCarbs") || carbRange[1].toString()),
    },
    proteinRange: {
      rangeStart: parseInt(
        params.get("minProtein") || proteinRange[0].toString()
      ),
      rangeEnd: parseInt(
        params.get("maxProtein") || proteinRange[1].toString()
      ),
    },
    fatRange: {
      rangeStart: parseInt(params.get("minFat") || fatRange[0].toString()),
      rangeEnd: parseInt(params.get("maxFat") || fatRange[1].toString()),
    },
  });

  /*const d = searchParams.get("filter");
  let params = new URLSearchParams(d || "");
  console.log(params.get("diet")?.split("|"));
  console.log(params.get("mealType"));
  console.log(params.get("includeIngredients"));*/

  const handleClick = () => {
    const url = filterBuilder(filter);
    setSearchParams((prev) => {
      prev.set("filter", url);
      prev.set("page", "0");
      return prev;
    });
  };

  return (
    <>
      <IconButton
        colorScheme="orange"
        aria-label="Filter"
        icon={<IoFilterSharp />}
        onClick={onOpen}
      />

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
            {/*------------------------------- Ingredients ------------------------------------------*/}

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
                    ingredients: data,
                  });
                }}
              />
            </Box>

            {/*----------------------------------- Diets --------------------------------------------*/}

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
                    diets: data,
                  });
                }}
              />
            </Box>

            {/*------------------------------- Intolerances ------------------------------------------*/}

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
                    intolerances: data,
                  });
                }}
              />
            </Box>

            {/*------------------------------- Meal type ------------------------------------------*/}

            <Box marginBottom={marginBottom}>
              <DrawerText>Meal type</DrawerText>
              <Select
                styles={reactSingleSelectStyles}
                options={mealTypes}
                defaultValue={filter.mealType}
                isClearable
                onChange={(data) => {
                  console.log(data);
                  updateFilter({
                    ...filter,
                    mealType: data,
                  });
                }}
              />
            </Box>

            {/*------------------------------- Calorie range ------------------------------------------*/}

            <Box marginBottom={marginBottom}>
              <DrawerText>Calorie range</DrawerText>
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

            {/*------------------------------- Carb range ------------------------------------------*/}

            <Box marginBottom={marginBottom}>
              <DrawerText>Carb range</DrawerText>
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

            {/*------------------------------- Protein range ------------------------------------------*/}

            <Box marginBottom={marginBottom}>
              <DrawerText>Protein range</DrawerText>
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

            {/*------------------------------- Fat range ------------------------------------------*/}

            <Box marginBottom={marginBottom}>
              <DrawerText>Fat range</DrawerText>
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

          {/*------------------------------- Submit button ------------------------------------------*/}

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
