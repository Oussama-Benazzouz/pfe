import { Button, Input, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

function Login() {

  const setAuthModalState = useSetRecoilState(authModalState);  

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event) => {
    event.preventDefault();
    //login user

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event) => {

    //update the form state
    setLoginForm((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
    }))
  };


  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        type="email"
        placeholder="Email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        type="password"
        placeholder="Password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      {error && (
        <Text className="mt-2" textAlign="center" color="red" fontSize="10pt">
          {FIREBASE_ERRORS[error.message]}
        </Text>
      )}

      <Button
        type="submit"
        width={"100%"}
        height="36px"
        variant="solid"
        colorScheme="teal"
        mt={2}
        mb={2}
        borderRadius="xl"
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9.5pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          fontWeight="bold"
          color="#FF8682"
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9.5pt" justifyContent="center">
        <Text>
          New Here?{" "}
          <span
            className="text-[#FF8682] font-bold cursor-pointer"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
          >
            Sign Up
          </span>
        </Text>
      </Flex>
    </form>
  );
}

export default Login;
