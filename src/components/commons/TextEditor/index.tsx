import React, { useEffect, useState } from "react";
import { ReactQuillProps } from "react-quill";
import { StyledReactQuill } from "./styles";
import { BoxProps } from "../Box";

interface Props extends ReactQuillProps, BoxProps {}

const TextEditor = ({ theme = "snow", ...restProps }: Props) => {
  return <StyledReactQuill theme={theme} {...restProps} />;
};

export default TextEditor;
