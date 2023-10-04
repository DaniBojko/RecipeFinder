import {
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import ErrorText from "./ErrorText";
import { marginBottom, inputVariant } from "../assets/StyleVariables";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FieldErrors, ChangeHandler } from "react-hook-form";
import React from "react";

const borderColor = "#b83280";
const colorScheme = "pink";

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
          <Icon
            color={borderColor}
            cursor="pointer"
            as={show ? LuEye : LuEyeOff}
            onClick={setShow}
          />
          {/*<IconButton
            aria-label={show ? "Hide password" : "Show password"}
            h="0"
            border="0"
            variant="outline"
            colorScheme={colorScheme}
            icon={show ? <LuEye /> : <LuEyeOff />}
            onClick={setShow}
  />*/}
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