import { Steps } from "antd";
import styled from "styled-components";

const StyledSteps = styled(Steps)`
  .ant-steps-item-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-steps-item-process .ant-steps-item-icon {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${({ theme }) => theme.colors.primary};
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-icon
    .ant-steps-icon {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .ant-steps-item-title:after {
    background-color: ${({ theme }) => theme.colors.textLight} !important;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }
`;

export default StyledSteps;
