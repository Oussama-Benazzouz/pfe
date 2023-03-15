import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import Image from "next/legacy/image";
import img from "/public/images/gomoroccomid.svg";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPassword from "./ResetPassword";

function AuthModal() {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              w="70%"
              pb={6}
            >
              {/* <div className="relative flex items-center h-5 md:h-10 cursor-pointer my-auto w-full">
                <Image
                  src={img}
                  objectFit="contain"
                  objectPosition="center"
                  alt="GoMorocco Logo"
                  layout="fill"
                />
              </div> */}
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <AuthInputs />
                  <Text mt={4} color="gray.500" fontWeight="700">
                    OR
                  </Text>
                  <OAuthButtons />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
