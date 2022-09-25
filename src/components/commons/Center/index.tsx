import React from "react";
import Box, { BoxProps } from "../Box";

interface Props extends BoxProps {}

const Center = ({ children, ...restProps }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Center;
