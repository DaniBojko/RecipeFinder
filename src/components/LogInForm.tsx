import { Button, Center, Text, HStack, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { colorPalette, marginBottom } from "../assets/StyleVariables";
import { useNavigate, useLocation } from "react-router-dom";
import InputPasswordField from "./InputPasswordField";
import InputTextField from "./InputTextField";
import backEnd from "../services/back-end";
import ErrorText from "./ErrorText";
import useAuth from "../hooks/useAuth";
import FormWrapper from "./Wrappers/FormWrapper";

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

  const onSubmit = (data: FieldValues) => {
    setIsSubmitting(true);
    if (errMsg) setErrMsg("");
    backEnd
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
          favouriteList: res.data.favourites,
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
    <FormWrapper>
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
          {isSubmitting ? <Spinner color={colorPalette.primary} /> : "Log in"}
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
    </FormWrapper>
  );
};

export default LogInForm;
