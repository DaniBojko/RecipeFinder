import {
  Button,
  Center,
  ChakraProvider,
  Container,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import ErrorText from "./ErrorText";
import { marginBottom } from "../assets/StyleVariables";
import InputTextField from "./InputTextField";
import InputPasswordField from "./InputPasswordField";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPW, setShowPW] = useState(false);
  const [showVPW, setShowVPW] = useState(false);
  const [pwState, setPwState] = useState({ first: "", second: "" });

  const colorScheme = "pink";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const validateEmail = (email: string) => {
    // FIX W DB
    if (email === "asd@asd") return "This email is already in use";

    if (email === "asd") return "Invalid e-mail.";

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
    <ChakraProvider>
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
            {/* ------------------------------   EMAIL FIELD   ------------------------------ */}

            <InputTextField
              err={errors}
              placeholder="E-mail"
              {...register("email", {
                required: "Please enter your email",
                validate: (value) => validateEmail(value),
              })}
            />

            {/* ------------------------------   USERNAME FIELD   ------------------------------ */}

            <InputTextField
              err={errors}
              placeholder="Username"
              {...register("username", {
                required: "Please enter your Username.",
                validate: (value) => validateUserName(value),
              })}
            />

            {/* ------------------------------   PASSWORD FIELD   ------------------------------ */}

            <InputPasswordField
              err={errors}
              placeholder="Password"
              show={showPW}
              setShow={() => setShowPW(!showPW)}
              {...register("password", {
                required: "Please enter your password.",
                onChange: (e) =>
                  setPwState({ ...pwState, first: e.target.value }),
              })}
            />

            {pwState.first.length > 0 && !validatePassword(pwState.first) && (
              <ErrorText>Password is too weak.</ErrorText>
            )}

            {/* ------------------------------   CONFIRM PASSWORD   ------------------------------ */}

            <InputPasswordField
              err={errors}
              placeholder="Confirm Password"
              show={showVPW}
              setShow={() => setShowVPW(!showVPW)}
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                onChange: (e) =>
                  setPwState({ ...pwState, second: e.target.value }),
              })}
            />

            {pwState.first != pwState.second && pwState.second.length > 0 && (
              <ErrorText>Passwords do not match.</ErrorText>
            )}
            {/* ------------------------------   SUBMIT BUTTON   ------------------------------ */}

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
    </ChakraProvider>
  );
};

export default RegisterForm;
