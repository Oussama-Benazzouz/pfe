import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom'

function AuthModal() {
  const [modalState, setModalState] = useRecoilState(authModalState); 

  const handleClose = () => {
    setModalState((prev) =>({
        ...prev,
        open: false,
    }) )
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Here is the content
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal