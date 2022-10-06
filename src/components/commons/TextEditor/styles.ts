import ReactQuill, { ReactQuillProps } from "react-quill";
import styled from "styled-components";
import Box from "../Box";

export const StyledReactQuill = styled(ReactQuill)`
  .ql-toolbar.ql-snow {
    border: 0;
    background-color: transparent;
    padding: 20px 10px;
  }
  .ql-container.ql-snow {
    border: 0;
    background-color: transparent;
  }
`;
