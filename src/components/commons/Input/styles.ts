import { color } from "src/utils/colors";
import styled, { css } from "styled-components";

interface WrapperProps {
  width?: string;
}

interface InputWrapperProps {
  disabled?: boolean;
  isError?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  width: ${({ width }) => width ?? "100%"};
  position: relative;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${color.text};
  padding: 0 8px;
  background-color: white;

  position: absolute;
  top: -9px;
  left: 18px;
  z-index: 2;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isError }) =>
    !isError ? color.lightGray : `${color.danger} !important`};
  border-radius: 6px;
  transition: all 0.2s ease-in;
  &:focus-within {
    border-color: ${color.primary};
    box-shadow: 0 1px 8px -2px ${({ isError }) => (!isError ? `#FDD32B` : `#F27166`)};
  }
  &:hover {
    border-color: ${color.primary};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${color.lightGray};
      border-color: ${color.lightGray} !important;
      box-shadow: unset !important;
      cursor: no-drop;
      input {
        pointer-events: none;
      }
    `};
  input {
    width: 100%;
    padding: 12px 16px;
    color: ${color.textLight};
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    background-color: transparent;
    border: 0;
    &:focus {
      color: ${color.text};
      outline: none;
    }
  }
`;
