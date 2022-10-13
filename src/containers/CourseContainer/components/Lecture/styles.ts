import Box from "src/components/commons/Box";
import styled from "styled-components";

export const LectureWrapper = styled(Box)`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;
