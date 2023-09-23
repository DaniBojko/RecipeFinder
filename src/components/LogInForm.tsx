import {
  Button,
  Center,
  Container,
  Text,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { marginBottom } from "../assets/StyleVariables";
import { useNavigate } from "react-router-dom";
import InputPasswordField from "./InputPasswordField";
import InputTextField from "./InputTextField";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const colorScheme = "teal";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
            <Text>Log in to your account</Text>
          </Center>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ------------------------------   EMAIL FIELD   ------------------------------ */}

            <InputTextField
              err={errors}
              placeholder="E-mail"
              {...register("loginEmail", {
                required: "Please enter your E-mail.",
              })}
            />

            {/* ------------------------------   PASSWORD FIELD   ------------------------------ */}

            <InputPasswordField
              err={errors}
              placeholder="Password"
              show={show}
              setShow={() => setShow(!show)}
              {...register("loginPassword", {
                required: "Please enter your Password.",
              })}
            />

            {/* ------------------------------   SUBMIT BUTTON   ------------------------------ */}

            <Button
              marginY={marginBottom}
              colorScheme={colorScheme}
              w="100%"
              type="submit"
              variant="outline"
            >
              Log In
            </Button>

            {/* ------------------------------   REGISTER BUTTON   ------------------------------ */}

            <Center>
              <Text margin="0">Not a member yet?</Text>
              <Button
                marginLeft="7px"
                onClick={() => navigate("/register")}
                colorScheme={colorScheme}
                variant="link"
              >
                Register
              </Button>
            </Center>
          </form>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default LogInForm;
