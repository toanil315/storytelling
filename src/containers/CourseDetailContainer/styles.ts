import Box from "src/components/commons/Box";
import styled from "styled-components";

export const Description = styled(Box)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  ul,
  li {
    margin-left: 15px;
  }
  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }
`;
