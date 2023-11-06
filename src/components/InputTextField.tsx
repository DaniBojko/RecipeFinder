import { Input } from "@chakra-ui/react";
import { ChangeHandler, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ErrorText from "./ErrorText";
import { marginBottom, inputVariant } from "../assets/StyleVariables";
import React from "react";
import { colorPalette } from "../assets/StyleVariables";

const borderColor = colorPalette.primary;

export interface Props {
  err: FieldErrors;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  placeholder?: string;
}

const InputTextField = (
  { err, onChange, onBlur, name, placeholder }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) => {
  return (
    <>
      <Input
        focusBorderColor={borderColor}
        marginBottom={marginBottom}
        variant={inputVariant}
        id={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />

      <ErrorMessage
        errors={err}
        name={name}
        render={({ message }) => <ErrorText>{message}</ErrorText>}
      />
    </>
  );
};

export default React.forwardRef(InputTextField);
