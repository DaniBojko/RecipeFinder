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
};

export const reactSelectStyles = {
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
