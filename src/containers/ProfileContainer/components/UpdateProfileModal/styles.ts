import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import styled, { css } from "styled-components";

export const AvatarContainer = styled(Box)<{ loading?: boolean }>`
  width: 110px;
  height: 110px;
  border-radius: ${({ theme }) => theme.radii.rounded};
  overflow: hidden;

  position: relative;

  ${({ loading }) =>
    loading &&
    css`
      .ava-uploader {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: unset !important;
      }
    `}

  .ava-uploader {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    transition: all 0.2s ease-out;
  }

  &:hover {
    .ava-uploader {
      opacity: 1;
      visibility: visible;
      pointer-events: unset;
    }
  }
`;

export const UploadAvatarWrapper = styled(Center)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;
