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
import { LuEye, LuEyeOff } from "react-icons/lu";

import { marginBottom, inputVariant } from "../assets/StyleVariables";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPW, setShowPW] = useState(false);
  const [showVPW, setShowVPW] = useState(false);

  const colorScheme = "pink";
  const borderColor = "#b83280";

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="E-mail"
          />
          {errors.email?.type === "required" && (
            <p>Please enter your E-mail.</p>
          )}

          <Input
            focusBorderColor={borderColor}
            marginBottom={marginBottom}
            variant={inputVariant}
            {...register("username", { required: true, minLength: 3 })}
            id="username"
            type="text"
            placeholder="Username"
          />
          {errors.username?.type === "minLength" && (
            <p>Your username is not long enough.</p>
          )}
          {errors.username?.type === "required" && (
            <p>Please enter a username.</p>
          )}

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              {...register("password", { required: true })}
              id="password"
              type={showPW ? "text" : "password"}
              placeholder="Password"
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
          {errors.password?.type === "required" && (
            <p>Please enter your password.</p>
          )}

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              {...register("password2", { required: true })}
              id="password2"
              type={showVPW ? "text" : "password"}
              placeholder="Verify password"
            />
            <InputRightElement>
              <IconButton
                aria-label={showVPW ? "Hide password" : "Show password"}
                h="0"
                border="0"
                variant="outline"
                colorScheme={colorScheme}
                icon={showPW ? <LuEye /> : <LuEyeOff />}
                onClick={() => setShowVPW(!showVPW)}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password2?.type === "required" && (
            <p>Please confirm your password.</p>
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
