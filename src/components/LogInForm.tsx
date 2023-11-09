import {
  Button,
  Center,
  Container,
  Text,
  ChakraProvider,
  HStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { marginBottom } from "../assets/StyleVariables";
import { useNavigate, useLocation } from "react-router-dom";
import InputPasswordField from "./InputPasswordField";
import InputTextField from "./InputTextField";
import backEnd from "../services/back-end";
import ErrorText from "./ErrorText";
import useAuth from "../hooks/useAuth";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm();

  const { setAuth } = useAuth();
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().state?.from?.pathname || "/";

  const colorScheme = "orange";

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    if (errMsg) setErrMsg("");
    await backEnd
      .post(
        "/login",
        { email: data.loginEmail, password: data.loginPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsSubmitting(false);
        const a = {
          email: data.loginEmail,
          password: data.loginPassword,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        console.log(a);
        setAuth({ ...a });
        navigate(location, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);

        if (!err?.response) {
          setErrMsg("Server error, try again later.");
          return;
        }
        if (err.response.status === 401) {
          setErrMsg("E-mail or password is incorrect.");
          setError(
            "loginEmail",
            {
              type: "custom",
            },
            { shouldFocus: true }
          );
        } else {
          setErrMsg("Login failed, please try again.");
        }
      });
  };

  useEffect(() => setFocus("loginEmail"), []);

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
              {isSubmitting ? <Spinner color="red.500" /> : "Log in"}
            </Button>

            {/* ------------------------------   REGISTER BUTTON   ------------------------------ */}

            <Flex justify="center">
              <ErrorText>{errMsg}</ErrorText>
            </Flex>

            <Center>
              <HStack>
                <Text margin="0">Not a member yet?</Text>
                <Button
                  onClick={() => navigate("/register")}
                  colorScheme={colorScheme}
                  variant="link"
                >
                  Register
                </Button>
              </HStack>
            </Center>
          </form>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default LogInForm;
