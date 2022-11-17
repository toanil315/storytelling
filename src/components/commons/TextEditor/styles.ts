import { ReactQuillProps } from "react-quill";
import styled from "styled-components";
import Box from "../Box";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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
