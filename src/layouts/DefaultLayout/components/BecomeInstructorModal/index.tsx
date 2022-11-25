import React from "react";
import Box from "src/components/commons/Box";
import Form from "src/components/Form";
import CustomModal from "src/components/Modal";
import { UseModalHelper } from "src/hooks/useModal";

interface Props {
  modal: UseModalHelper;
}

const BecomeInstructorModal = ({ modal }: Props) => {
  return (
    <CustomModal open={modal.show} onCancel={modal.closeModal}>
      <Box width="500px"></Box>
    </CustomModal>
  );
};

export default BecomeInstructorModal;
