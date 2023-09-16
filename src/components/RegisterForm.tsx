import {
  Button,
  Center,
  Container,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { marginBottom, inputVariant } from "../assets/StyleVariables";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [showPW, setShowPW] = useState(false);
  const [showVPW, setShowVPW] = useState(false);

  const colorScheme = "pink";
  const borderColor = "#b83280";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const validateEmail = (email: string) => {
    if (email === "asd@asd") return false;
    return true;
  };

  const validateUserName = (uname: string) => {
    const regex = /^[a-zA-Z0-9_]+$/;

    if (!regex.test(uname)) return [false, "Invalid Username"];
    if (uname.length < 3) return [false, "Username is not long enough."];
    if (uname.length >= 15) return [false, "Username is too long."];
    if (uname === "ASDFG") return [false, "Username is taken."];
    return [true, ""];
  };

  const validatePassword = (pw: string) => {
    if (pw.length < 5) return false;

    return true;
  };

  return (
    <Center h="100vh" padding="20px">
      <Container
        maxW="50ch"
        paddingX="50px"
        paddingY="20px"
        borderRadius="15px"
      >
        <Center>
          <Text>Create a new account</Text>
        </Center>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            focusBorderColor={borderColor}
            marginBottom={marginBottom}
            variant={inputVariant}
            id="email"
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: "Please enter your E-mail.",
              validate: (value) => {
                return validateEmail(value) || "This E-mail is already in use.";
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />

          <Input
            focusBorderColor={borderColor}
            marginBottom={marginBottom}
            variant={inputVariant}
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Please enter your Username.",
              validate: (value) => {
                const [ret, msg] = validateUserName(value);
                return ret || msg;
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p>{message}</p>}
          />

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              id="password"
              type={showPW ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Please enter your password.",
                validate: (value) =>
                  validatePassword(value) || "Password is weak",
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPW ? "Hide password" : "Show password"}
                h="0"
                border="0"
                variant="outline"
                colorScheme={colorScheme}
                icon={showPW ? <LuEye /> : <LuEyeOff />}
                onClick={() => setShowPW(!showPW)}
              />
            </InputRightElement>
          </InputGroup>

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p>{message}</p>}
          />

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              id="password2"
              type={showVPW ? "text" : "password"}
              placeholder="Confirm password"
              {...register("password2", {
                required: "Please confirm your password.",
                validate: (value) =>
                  getValues("password") === value || "Passwords do not match.",
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={showVPW ? "Hide password" : "Show password"}
                h="0"
                border="0"
                variant="outline"
                colorScheme={colorScheme}
                icon={showVPW ? <LuEye /> : <LuEyeOff />}
                onClick={() => setShowVPW(!showVPW)}
              />
            </InputRightElement>
          </InputGroup>

          <ErrorMessage
            errors={errors}
            name="password2"
            render={({ message }) => <p>{message}</p>}
          />

          <Button
            marginY={marginBottom}
            colorScheme={colorScheme}
            w="100%"
            type="submit"
            variant="outline"
          >
            Register
          </Button>
        </form>
      </Container>
    </Center>
  );
};

export default RegisterForm;
