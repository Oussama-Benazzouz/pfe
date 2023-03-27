import React from "react";
import { Flex, Button, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";

const ProfileNotFound = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="69vh"
    >
      <Heading
        display="inline-block"
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
        mb="4"
      >
        404
      </Heading>
      <Text fontSize="22px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <Link href="/" >
        <Button variant="solid" colorScheme="teal">
          GO HOME
        </Button>
      </Link>
    </Flex>
  );
};
export default ProfileNotFound;
