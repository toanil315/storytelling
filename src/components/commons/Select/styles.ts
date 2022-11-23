import { Select } from "antd";
import styled, { css } from "styled-components";
import Box from "../Box";

interface WrapperProps {
  width?: string;
}

interface SelectWrapperProps {
  disabled?: boolean;
  isError?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  width: ${({ width }) => width ?? "100%"};
  position: relative;
`;

export const Label = styled(Box)`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.small};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  background-color: white;

  position: absolute;
  top: -9px;
  left: 18px;
  z-index: 2;
`;

export const SelectWrapper = styled.div<SelectWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isError, theme }) =>
    !isError ? theme.colors.lightGray : `${theme.colors.danger} !important`};
  border-radius: 6px;
  transition: all 0.2s ease-in;
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 1px 8px -2px ${({ isError }) => (!isError ? `#FDD32B` : `#F27166`)};
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.lightGray};
      border-color: ${({ theme }) => theme.colors.lightGray} !important;
      box-shadow: unset !important;
      cursor: no-drop;
      input {
        pointer-events: none;
      }
    `};
`;

export const StyledSelect = styled(Select)`
  padding: 10px 16px;

  .ant-select-selector {
    border: unset !important;
    box-shadow: unset !important;
    outline: none;
    height: unset !important;
  }

  .ant-select-selection-overflow-item .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1;
  }

  .ant-select-selection-item {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  &.ant-select-multiple .ant-select-selection-item-content {
    line-height: 1.5 !important;
  }
`;
