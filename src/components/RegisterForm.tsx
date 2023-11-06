import {
  Button,
  Center,
  ChakraProvider,
  Container,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import ErrorText from "./ErrorText";
import { marginBottom } from "../assets/StyleVariables";
import InputTextField from "./InputTextField";
import InputPasswordField from "./InputPasswordField";
import backEnd from "../services/back-end";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm();

  const [showPW, setShowPW] = useState(false);
  const [showVPW, setShowVPW] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [pwState, setPwState] = useState({ first: "", second: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const colorScheme = "orange";
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    setErrMsg("");
    setIsSubmitting(true);
    await backEnd
      .post(
        "/register",
        { email: data.email, password: data.password },
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true,
        }
      )
      .then((res) => {
        setIsSubmitting(false);
        setSuccess(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        if (!err?.response) {
          setErrMsg("Server error, try again later.");
          return;
        }
        if (err.response.status === 409) {
          setError(
            "email",
            {
              type: "custom",
              message: "User with this e-mail exists.",
            },
            { shouldFocus: true }
          );
        } else {
          setErrMsg("Registration failed, please try again.");
        }
      });
  };

  const validateEmail = () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
    if (!regex.test(emailState)) return false;

    return true;
  };

  /*const validateUserName = (uname: string) => {
    // FIX W DB
    const regex = /^[a-zA-Z0-9_]+$/;
    const len = uname.length;

    if (!regex.test(uname)) return "Invalid Username";
    if (len < 3) return "Username is not long enough.";
    if (len >= 15) return "Username is too long.";
    if (uname === "ASDFG") return "Username is taken.";

    return true;
  };*/

  const validatePassword = () => {
    if (pwState.first.length < 5) return false;

    return true;
  };

  const validateConfirm = () => {
    if (pwState.second !== pwState.first) return false;

    return true;
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <ChakraProvider>
      <Center h="100vh">
        <Container
          maxW="50ch"
          paddingX="50px"
          paddingY="20px"
          borderRadius="15px"
        >
          {success ? (
            <>
              {/* ------------------------------   SUCCESS   ------------------------------ */}

              <Center>
                <Text>Account created.</Text>
              </Center>
              <Button
                marginY={marginBottom}
                colorScheme={colorScheme}
                w="100%"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </>
          ) : (
            <>
              {/* ------------------------------   FORM   ------------------------------ */}
              <Center>
                <Text>Create account.</Text>
              </Center>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ------------------------------   EMAIL FIELD   ------------------------------ */}

                <InputTextField
                  err={errors}
                  placeholder="E-mail"
                  {...register("email", {
                    required: "Please enter your email",
                    validate: () => validateEmail(),
                    onChange: (e) => setEmailState(e.target.value),
                  })}
                />

                {emailState.length > 0 && !validateEmail() && (
                  <ErrorText>Invalid E-mail.</ErrorText>
                )}
                {/* ------------------------------   USERNAME FIELD   ------------------------------ */}

                {/*<InputTextField
              err={errors}
              placeholder="Username"
              {...register("username", {
                required: "Please enter your Username.",
                validate: (value) => validateUserName(value),
              })}
            />*/}

                {/* ------------------------------   PASSWORD FIELD   ------------------------------ */}

                <InputPasswordField
                  err={errors}
                  placeholder="Password"
                  show={showPW}
                  setShow={() => setShowPW(!showPW)}
                  {...register("password", {
                    required: "Please enter your password.",
                    validate: () => validatePassword(),
                    onChange: (e) =>
                      setPwState({ ...pwState, first: e.target.value }),
                  })}
                />

                {pwState.first.length > 0 && !validatePassword() && (
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
                    validate: () => validateConfirm(),
                    onChange: (e) =>
                      setPwState({ ...pwState, second: e.target.value }),
                  })}
                />

                {pwState.first != pwState.second &&
                  pwState.second.length > 0 && (
                    <ErrorText>Passwords do not match.</ErrorText>
                  )}
                {/* ------------------------------   SUBMIT BUTTON   ------------------------------ */}

                <Button
                  marginY={marginBottom}
                  colorScheme={colorScheme}
                  w="100%"
                  type="submit"
                  variant="outline"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner color="red.500" /> : "Register"}
                </Button>
              </form>
              <Flex justify="center">
                <ErrorText>{errMsg}</ErrorText>
              </Flex>
            </>
          )}
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default RegisterForm;
