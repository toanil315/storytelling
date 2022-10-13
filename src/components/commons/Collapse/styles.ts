import styled from "styled-components";
import Box from "../Box";

export const CollapseHeader = styled(Box)`
  position: relative;
`;

export const CollapseArrow = styled(Box)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
