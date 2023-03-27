import {
  FormControl,
  FormLabel,
  Grid,
  Box,
  Flex,
  Text,
  Button,
  Image,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/clientApp";
import deleteFile from "../../firebase/deleteFile";
import uploadFile from "../../firebase/uploadFile";

// import CostumInput from "./CostumInput";

function AccountSettings({ userData }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState("hidden");
  const [disabled, setDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const removeFile = () => {
    setFile(null);
  };



  const handleUpdate = async (e) => {   
    setLoading(true);
    if (user.providerId === "password") {
      try {
        await user.updateEmail(email);
        await user.updatePassword(password);
      } catch (error) {
        console.log("Error updating email/password: ", error);
      }
    }


    let userObj = {};

    if (firstName !== user.firstName) {
      userObj.firstName = firstName;
    }

    if (lastName !== user.lastName) {
      userObj.lastName = lastName;
    }

    if (phoneNumber != user.phoneNumber) {
      userObj.phoneNumber = phoneNumber;
    }

    try {
      if (file) {
        const imageName = user.uid + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(file, `profile/${user?.uid}/${imageName}`);
        userObj.photoURL = url;

        if (user?.photoURL) {
          const prevImage = user?.photoURL
            ?.split(`${user?.uid}%2F`)[1]
            ?.split("?")[0];
          if (prevImage) {
            try {
              await deleteFile(`profile/${user?.uid}/${prevImage}`);
            } catch (error) {
              console.log("Error deleting previous image: ", error);
            }
          }
        }
      }

      if (Object.keys(userObj).length > 0) {
        await updateDoc(doc(firestore, "users", user.uid), userObj);
      }
      setLoading(false);
      window.location.reload();

    } catch (error) {
      console.log("Error updating user data: ", error);
    }
  };


  const handleEdit = () => {
    setDisabled(!disabled);
    setVisible("visible");
    setIsEditing(!isEditing);
  };

  return (
    <Flex flexDirection="column">
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            focusBorderColor="#4164e3"
            defaultValue={userData.firstName === "" ? "" : userData.firstName}
            isDisabled={disabled}
            onChange={handleFirstNameChange}
          />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>

          <Input
            type="text"
            focusBorderColor="#4164e3"
            defaultValue={userData.lastName === "" ? "" : userData.lastName}
            isDisabled={disabled}
            onChange={handleLastNameChange}
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            focusBorderColor="#4164e3"
            defaultValue={
              userData.phoneNumber === "" ? "" : userData.phoneNumber
            }
            isDisabled={disabled}
            onChange={handlePhoneNumberChange}
          />
        </FormControl>

        {user.providerId === "password" ? (
          <>
            <FormControl id="emailAddress">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                focusBorderColor="#4164e3"
                defaultValue={userData.email === "" ? "" : userData.email}
                isDisabled={disabled}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="Password"
                focusBorderColor="#4164e3"
                defaultValue={userData.password === "" ? "" : userData.password}
                isDisabled={disabled}
                onChange={handlePasswordChange}
              />
            </FormControl>
          </>
        ) : (
          <>
            <FormControl id="emailAddress">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                focusBorderColor="#4164e3"
                defaultValue={userData.email === "" ? "" : userData.email}
                disabled
              />
            </FormControl>
          </>
        )}
        <FormControl id="dropZone" className={visible}>
          <FormLabel>Change Profile Image</FormLabel>
          <Box
            {...getRootProps()}
            w="100%"
            h="200px"
            borderWidth="2px"
            borderRadius="lg"
            p="2"
          >
            <input {...getInputProps()} />
            {file ? (
              <Flex align="center" justify="center" flexDir="column">
                <Image src={file.preview} w="100px" h="100px" mb="2" />
                <Button size="sm" onClick={removeFile}>
                  Remove Image
                </Button>
              </Flex>
            ) : (
              <Flex align="center" justify="center" flexDir="column" h="100%">
                <Text>
                  Drag and drop an image here, or click to select a file
                </Text>
              </Flex>
            )}
          </Box>
        </FormControl>
      </Grid>
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="#e9ebee">
        {isEditing ? (
          <>
            <Button
              variant="solid"
              colorScheme="teal"
              onClick={handleUpdate}
              isLoading={loading}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <Button variant="solid" colorScheme="teal" onClick={handleEdit}>
              Edit
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default AccountSettings;
