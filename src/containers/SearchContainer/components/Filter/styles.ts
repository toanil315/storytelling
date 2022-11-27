import Box from "src/components/commons/Box";
import styled, { css } from "styled-components";

interface Props {
  active?: boolean;
}

export const FilterItemWrapper = styled(Box)<Props>`
  display: inline-block;

  padding: 5px 8px;
  margin: 8px 4px 0 0;
  background-color: white;

  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};

  border: 1px solid ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radii.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.textLight};
    color: white;
  }

  ${({ active, theme }) =>
    active &&
    css`
      background-color: ${theme.colors.textLight};
      color: white;
    `}

  cursor: pointer;
`;
