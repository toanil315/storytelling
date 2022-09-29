import Box from "src/components/commons/Box";
import styled from "styled-components";

export const AvatarContainer = styled(Box)`
  width: 110px;
  height: 110px;
  border-radius: ${({ theme }) => theme.radii.rounded};
  overflow: hidden;
`;
