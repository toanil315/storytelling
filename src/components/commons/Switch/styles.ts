import { Switch } from "antd";
import styled from "styled-components";

export const StyledSwitch = styled(Switch)`
  & {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  &.ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
