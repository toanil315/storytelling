import React, { useEffect } from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import CustomModal from "src/components/Modal";
import { useRequestToBecomeAnInstructor } from "src/hooks/apis";
import { UseModalHelper } from "src/hooks/useModal";

interface Props {
  modal: UseModalHelper;
}

const BecomeInstructorModal = ({ modal }: Props) => {
  const { requestToBecomeAnInstructor, isLoading, isSuccess } =
    useRequestToBecomeAnInstructor();

  useEffect(() => {
    if (modal.show && isSuccess) {
      modal.closeModal();
    }
  }, [isSuccess, modal]);

  return (
    <CustomModal open={modal.show} onCancel={modal.closeModal}>
      <Center width="400px">
        <Box width="300px" height="300px">
          <ImageComponent
            alt="become to instructor"
            src="/assets/request.png"
          />
        </Box>
      </Center>
      <Text
        fontSize="lg"
        fontWeight="medium"
        lineHeight="xl"
        color="text"
        textAlign="center"
      >
        Do you want to become to an Instructor?
      </Text>
      <Center margin="10px 0">
        <Button
          loading={isLoading}
          onClick={() => requestToBecomeAnInstructor()}
        >
          <Center width="100px">Yes</Center>
        </Button>
      </Center>
    </CustomModal>
  );
};

export default BecomeInstructorModal;
