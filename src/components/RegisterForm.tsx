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
import WarningMessage from "./WarningMessage";
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
  const [pwState, setPwState] = useState({ first: "", second: "" });

  const colorScheme = "pink";
  const borderColor = "#b83280";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const validateEmail = (email: string) => {
    // FIX W DB
    if (email === "asd@asd") return false;

    return true;
  };

  const validateUserName = (uname: string) => {
    // FIX W DB
    const regex = /^[a-zA-Z0-9_]+$/;
    const len = uname.length;

    if (!regex.test(uname)) return "Invalid Username";
    if (len < 3) return "Username is not long enough.";
    if (len >= 15) return "Username is too long.";
    if (uname === "ASDFG") return "Username is taken.";

    return true;
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
            render={({ message }) => <WarningMessage>{message}</WarningMessage>}
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
              validate: (value) => validateUserName(value),
            })}
          />

          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <WarningMessage>{message}</WarningMessage>}
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
                onChange: (e) =>
                  setPwState({ ...pwState, first: e.target.value }),
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
            render={({ message }) => <WarningMessage>{message}</WarningMessage>}
          />

          {pwState.first.length > 0 && !validatePassword(pwState.first) && (
            <WarningMessage>Password is too weak.</WarningMessage>
          )}

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              id="password2"
              type={showVPW ? "text" : "password"}
              placeholder="Confirm password"
              {...register("password2", {
                required: "Please confirm your password.",
                onChange: (e) =>
                  setPwState({ ...pwState, second: e.target.value }),
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
            render={({ message }) => <WarningMessage>{message}</WarningMessage>}
          />

          {pwState.first != pwState.second && pwState.second.length > 0 && (
            <WarningMessage>Passwords do not match.</WarningMessage>
          )}

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
