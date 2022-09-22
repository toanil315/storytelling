import React from "react";
import Text from "../Typography";

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <Text fontSize="xs" fontWeight="medium" lineHeight="small" color="danger">
      {text}
    </Text>
  );
};

export default ErrorMessage;
