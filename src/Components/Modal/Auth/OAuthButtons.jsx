import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

function OAuthButtons() {

  const [signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" marginTop={5}>
        <Button leftIcon={<FcGoogle />} colorScheme={'gray'} variant="outline" isLoading={loading} onClick={() => signInWithGoogle()}>
          Continue with Google
        </Button>
        {error && 
          <Text>{error.message}</Text>
        }
    </Flex>
  )
}

export default OAuthButtons