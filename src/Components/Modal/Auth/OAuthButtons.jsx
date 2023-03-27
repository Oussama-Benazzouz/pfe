import { Button, Flex, Text } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';

function OAuthButtons() {

  const [signInWithGoogle, userCred, loading, error ] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (userCred) {
      const { user } = userCred;
      const userDocRef = doc(firestore, "users", user.uid);
      setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        firstName: "",
        LastName: "",
      })
        .then(() => {
          console.log("User document created successfully!");
        })
        .catch((error) => {
          console.error("Error creating user document:", error);
        });
    }
  }, [userCred]);

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