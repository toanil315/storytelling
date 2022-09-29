import Box from "src/components/commons/Box";
import styled from "styled-components";

export const ProfileHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const ProfileImage = styled(Box)`
  width: 110px;
  height: 110px;
  border: 2px;
  border: 2px solid ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.rounded};
  overflow: hidden;
`;
