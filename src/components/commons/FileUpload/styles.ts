import styled from "styled-components";
import Box from "../Box";
import Center from "../Center";

export const ProgressBar = styled(Box)`
  width: 100%;
  padding: 8px 15px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radii.large};
`;

interface ProgressProps {
  width: string;
}

export const Progress = styled(Box)<ProgressProps>`
  position: relative;
  transform: translateY(-50%);
  width: 95%;
  height: 1.5px;
  border-radius: ${({ theme }) => theme.radii.large};
  background-color: ${({ theme }) => theme.colors.textLight};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ width }) => `${width}%`};
    background-color: ${({ theme }) => theme.colors.green};
    transition: all 0.1s linear;
  }
`;
