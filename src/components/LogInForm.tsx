import {
  Input,
  Button,
  Center,
  Container,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { marginBottom, inputVariant } from "../assets/StyleVariables";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const colorScheme = "teal";
  const borderColor = "#319795";

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
          <Text>Log in to your account</Text>
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

          <InputGroup marginBottom={marginBottom}>
            <Input
              focusBorderColor={borderColor}
              variant={inputVariant}
              {...register("password", { required: true })}
              id="password"
              type={show ? "text" : "password"}
              placeholder="Password"
            />
            <InputRightElement>
              <IconButton
                aria-label={show ? "Hide password" : "Show password"}
                h="0"
                border="0"
                variant="outline"
                colorScheme={colorScheme}
                icon={show ? <LuEye /> : <LuEyeOff />}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password?.type === "required" && (
            <p>Please enter your Password.</p>
          )}

          <Button
            marginY={marginBottom}
            colorScheme={colorScheme}
            w="100%"
            type="submit"
            variant="outline"
          >
            Log In
          </Button>
          <Center>
            <Button
              onClick={() => console.log("password recovery initiated")}
              colorScheme={colorScheme}
              variant="link"
            >
              Forgot password?
            </Button>
          </Center>
        </form>
      </Container>
    </Center>
  );
};

export default LogInForm;
