import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
  }
`;

export const LanguageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  width: 100%;
  min-width: 220px;
  padding: 10px;

  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.large};
  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;
`;

export const LanguageItemActive = styled(LanguageItemWrapper)`
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 5px -5px rgba(0, 0, 0, 0.5);
`;
