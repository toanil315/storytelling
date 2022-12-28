import React, { useEffect } from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import CustomModal from "src/components/Modal";
import { useRequestToBecomeAnInstructor, useUser } from "src/hooks/apis";
import useModal, { UseModalHelper } from "src/hooks/useModal";

interface Props {
  modal: UseModalHelper;
}

const BecomeInstructorModal = ({ modal }: Props) => {
  const { requestToBecomeAnInstructor, isLoading, isSuccess } =
    useRequestToBecomeAnInstructor();
  const errorModal = useModal();
  const { user } = useUser();

  useEffect(() => {
    if (modal.show && isSuccess) {
      modal.closeModal();
    }
  }, [isSuccess, modal]);

  const handleRequest = () => {
    const fieldNeedToCheck = [
      "address",
      "email",
      "fullName",
      "identityImageUrl",
      "phone",
      "occupation",
      "dateOfBirth",
    ];
    const everyFieldIsFilled = fieldNeedToCheck.every((key) => {
      return Boolean(user?.[key as keyof typeof user]);
    });
    console.log(user, everyFieldIsFilled);
    if (everyFieldIsFilled) requestToBecomeAnInstructor();
    else errorModal.toggleModal();
  };

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
      <Text
        fontSize="sm"
        fontWeight="regular"
        lineHeight="md"
        color="textLight"
        textAlign="center"
      >
        (You must be fill your information before request to become an
        instructor)
      </Text>
      <Center margin="20px 0">
        <Button loading={isLoading} onClick={handleRequest}>
          <Center width="100px">Yes</Center>
        </Button>
      </Center>
      <CustomModal open={errorModal.show} onCancel={errorModal.closeModal}>
        <Center width="400px">
          <Box width="300px" height="300px">
            <ImageComponent
              alt="forget fill information"
              src="/assets/forget.png"
            />
          </Box>
        </Center>
        <Text
          fontSize="base"
          fontWeight="medium"
          lineHeight="xl"
          color="danger"
          textAlign="center"
        >
          Don't forget to fill all information before request!
        </Text>
        <Center margin="20px 0">
          <Button loading={isLoading} onClick={() => errorModal.closeModal()}>
            <Center width="100px">Ok</Center>
          </Button>
        </Center>
      </CustomModal>
    </CustomModal>
  );
};

export default BecomeInstructorModal;
