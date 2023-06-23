import React from "react";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { login } from "../features/dataSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //Make API call here to login and obtain necessary access token / load data from backend
        values.accessToken = "123456789";
        dispatch(login(values));
        navigate("/");
        resolve();
      }, 1000);
    });
  }

  return (
    <ChakraProvider>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box maxW="md" p="8" borderWidth="1px" borderRadius="md" boxShadow="md">
          <Heading mb="4">Login</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" mb="4">
              <FormLabel>Email address</FormLabel>
              <Input
                {...register("username", { required: "Email required" })}
                type="email"
              />
            </FormControl>
            <FormControl id="password" mb="4">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", { required: "password required" })}
                type="password"
              />
            </FormControl>
            <Button
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
              mb="4"
            >
              Login
            </Button>
          </form>

          <Text textAlign="center" mb="4">
            Don't have an account? <a href="#">Sign up</a>
          </Text>
          <Button colorScheme="blue">Signup</Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LoginPage;
