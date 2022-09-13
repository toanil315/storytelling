import React from "react";
import { ErrorMessageContainer } from "./styles";

const ErrorMessage = ({ text }: { text: string }) => {
  return <ErrorMessageContainer>{text}</ErrorMessageContainer>;
};

export default ErrorMessage;
