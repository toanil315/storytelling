import styled, { css } from "styled-components";
import Box, { BoxProps } from "../Box";

interface Props extends BoxProps {
  loading?: boolean;
  borderRadius?: string;
}

export const Loading = styled.span`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2.2px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.text};
    animation: spinner 0.7s linear infinite;
  }
`;

export const LoadingSecondary = styled(Loading)`
  &::before {
    border-top-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonBase = styled(Box)<Props>`
  /* css BaseButton */
  border-width: 1.6px;
  border-style: solid;
  outline: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  letter-spacing: 0.04rem;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none; // user cant click when button is loading
      filter: brightness(110%);
    `}

  ${({ borderRadius }) =>
    css`
      border-radius: ${borderRadius ?? "6px"};
    `}

  cursor: pointer;
  transition: all 0.15s ease-out;

  &:disabled {
    cursor: not-allowed;
    box-shadow: unset;
  }

  &:hover {
    filter: brightness(105%);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    filter: brightness(90%);
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`;

export const SecondaryButton = styled(ButtonBase)`
  background: white;
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

export const WhiteButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.text};
`;
