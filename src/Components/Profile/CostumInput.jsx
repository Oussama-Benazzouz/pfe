import {
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { ButtonGroup, Flex, IconButton, Input } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useEditableControls } from "@chakra-ui/editable";



export default function CustomInput({type, color, defvalue}) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" marginRight="2">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" marginRight="2">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="left"
      className="flex"
      justifyContent="center"
      alignItems="center"
      defaultValue={defvalue}
      fontSize="lg"
      isPreviewFocusable={true}
      flexGrow={1}
    >
      <EditablePreview flexGrow={1} className="px-2"/>
      <Input as={EditableInput} type={type} focusBorderColor={color} />
      <EditableControls />
    </Editable>
  );
}
