import { Button, Input, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

function SignUp() {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState('');

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event) => {

    event.preventDefault();
    if(error) setError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    //create user
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

    
  };

  const onChange = (event) => {
    //update the form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit} >
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
      <Input
        required
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
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

      {(error || userError) && (
        <Text className="mt-2" textAlign='center' color='red' fontSize='10pt'>
          {error 
            || FIREBASE_ERRORS[userError?.message]}
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
        Sign Up
      </Button>
      <Flex fontSize="9.5pt" justifyContent="center">
        <Text>
          Already have an account{" "}
          <span
            className="text-[#FF8682] font-bold cursor-pointer"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
          >
            Login
          </span>
        </Text>
      </Flex>
    </form>
  );
}

export default SignUp;
