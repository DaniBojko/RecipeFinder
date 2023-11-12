import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import ErrorText from "./ErrorText";
import {
  marginBottom,
  inputVariant,
  colorPalette,
} from "../assets/StyleVariables";
import { FieldErrors, ChangeHandler } from "react-hook-form";
import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const borderColor = colorPalette.primary;

export interface Props {
  err: FieldErrors;
  show: boolean;
  setShow: () => void;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  placeholder?: string;
}

const InputPasswordField = (
  { err, show, setShow, onChange, onBlur, name, placeholder }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) => {
  return (
    <>
      <InputGroup marginBottom={marginBottom}>
        <Input
          focusBorderColor={borderColor}
          variant={inputVariant}
          id={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        <InputRightElement>
          {show ? (
            <ViewIcon color={borderColor} cursor="pointer" onClick={setShow} />
          ) : (
            <ViewOffIcon
              color={borderColor}
              cursor="pointer"
              onClick={setShow}
            />
          )}
        </InputRightElement>
      </InputGroup>

      <ErrorMessage
        errors={err}
        name={name}
        render={({ message }) => <ErrorText>{message}</ErrorText>}
      />
    </>
  );
};

export default React.forwardRef(InputPasswordField);
