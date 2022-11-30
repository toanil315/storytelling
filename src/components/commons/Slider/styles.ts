import { Slider } from "antd";
import styled from "styled-components";

export const StyledSlider = styled(Slider)`
  .ant-slider-handle.ant-tooltip-open {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-slider-handle {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    .ant-slider-track {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    .ant-slider-handle {
      border-color: ${({ theme }) => theme.colors.primary} !important;
    }
  }

  .ant-slider-track {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
