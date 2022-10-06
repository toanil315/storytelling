import React from "react";
import Box from "../Box";
import Text from "../Typography";

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <Box margin="5px 0 0">
      <Text fontSize="xs" fontWeight="medium" lineHeight="small" color="danger">
        {text}
      </Text>
    </Box>
  );
};

export default ErrorMessage;
