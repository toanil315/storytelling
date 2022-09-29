import { ModalProps } from "antd";
import React from "react";
import { StyledModal } from "./styles";
import CloseIcon from "src/components/icons/CloseIcon";

interface Props extends ModalProps {}

const CustomModal = ({ ...restProps }: Props) => {
  return <StyledModal closeIcon={<CloseIcon />} footer={null} {...restProps} />;
};

export default CustomModal;
