import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  OptionProps,
} from "react-select";
import { ReactSelectData } from "../components/FilterDrawer";

export const colorPalette = {
  primary: "#dd6b20",
  secondary: "#fec445",
  secondaryLight: "#ffefca",
  accent: "#007369",
  backGround: "#f0f9f9",
};

export const reactSingleSelectStyles = {
  control: (
    baseStyles: CSSObjectWithLabel,
    state: ControlProps<ReactSelectData, false, GroupBase<ReactSelectData>>
  ) => ({
    ...baseStyles,
    boxShadow: "none",
    border: `2px solid  ${
      !state.isFocused ? colorPalette.secondary : colorPalette.primary
    }`,
    borderRadius: "0",
    ":hover": {
      borderColor: colorPalette.primary,
    },
  }),
  option: (
    baseStyles: CSSObjectWithLabel,
    state: OptionProps<ReactSelectData, false, GroupBase<ReactSelectData>>
  ) => ({
    ...baseStyles,
    color: state.isSelected ? colorPalette.primary : "000",
    fontWeight: state.isSelected ? "500" : "normal",
    backgroundColor: state.isFocused ? colorPalette.secondaryLight : "fff",
    ":active": {
      backgroundColor: colorPalette.secondaryLight,
    },
  }),
  menuList: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    maxHeight: "13rem",
  }),
};

export const reactMultiSelectStyles = {
  control: (
    baseStyles: CSSObjectWithLabel,
    state: ControlProps<ReactSelectData, true, GroupBase<ReactSelectData>>
  ) => ({
    ...baseStyles,
    boxShadow: "none",
    border: `2px solid  ${
      !state.isFocused ? colorPalette.secondary : colorPalette.primary
    }`,
    borderRadius: "0",
    ":hover": {
      borderColor: colorPalette.primary,
    },
  }),
  option: (
    baseStyles: CSSObjectWithLabel,
    state: OptionProps<ReactSelectData, true, GroupBase<ReactSelectData>>
  ) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colorPalette.secondaryLight : "fff",
    ":active": {
      backgroundColor: colorPalette.secondaryLight,
    },
  }),
  menuList: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    maxHeight: "13rem",
  }),
  multiValue: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: `${colorPalette.secondaryLight}`,
  }),
  multiValueRemove: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: `${colorPalette.primary}`,
    ":hover": {
      color: "red",
    },
  }),
  multiValueLabel: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: `${colorPalette.primary}`,
    fontWeight: "500",
  }),
};

const solid = defineStyle({
  borderRadius: "3px",
});

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});
export const theme = extendTheme({
  components: { Button: buttonTheme },
});
export const marginBottom = "10px";
export const inputVariant = "flushed";
