import { color } from "src/utils/colors";
import styled, { css } from "styled-components";

interface Props {
  loading?: boolean;
  width?: string;
  padding?: string;
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
    border-top-color: ${color.text};
    animation: spinner 0.7s linear infinite;
  }
`;

export const LoadingSecondary = styled(Loading)`
  &::before {
    border-top-color: ${color.primary};
  }
`;

export const ButtonBase = styled.div<Props>`
  /* css BaseButton */
  border-width: 1.6px;
  border-style: solid;
  border-radius: 6px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none; // user cant click when button is loading
      filter: brightness(110%);
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
  /* css primary button */
  /* example use theme global variables */
  background: ${color.primary};
  border-color: ${color.primary};
  color: ${color.text};
`;

export const SecondaryButton = styled(ButtonBase)`
  /* css secondary button */
  background: white;
  border-color: ${color.primary};
  color: ${color.primary};
`;

export const WhiteButton = styled(ButtonBase)`
  /* css gray button */
  background-color: ${color.white};
  border-color: ${color.textLight};
`;
