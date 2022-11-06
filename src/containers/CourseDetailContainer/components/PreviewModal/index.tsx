import React from "react";
import Box from "src/components/commons/Box";
import CustomModal from "src/components/Modal";
import { UseModalHelper } from "src/hooks/useModal";

interface Props {
  modal: UseModalHelper;
  videoLink: string;
}

const PreviewVideoModal = ({
  modal: { show, closeModal },
  videoLink,
}: Props) => {
  return (
    <CustomModal open={show} onCancel={closeModal}>
      <Box maxWidth="910px" padding="8px">
        <Box>
          <Box width="100%">
            <video width={"100%"} controls src={videoLink} />
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default PreviewVideoModal;
