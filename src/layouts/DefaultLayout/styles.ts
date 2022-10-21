import styled from "styled-components";

interface ContentWrapperProps {
  width?: string;
}

export const DefaultLayoutWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  width: ${({ width }) => width ?? "85%"};
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  position: relative;

  &::before {
    content: "";
    width: 150vw;
    height: 150vh;
    background-color: ${({ theme }) => theme.colors.lightPrimary};
    border-radius: ${({ theme }) => theme.radii.rounded};

    position: absolute;
    top: -100vh;
    left: -30%;
    z-index: 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px 25px;
  position: relative;
  z-index: 2;

  & > .content {
    margin-top: 25px;
  }

  @media (min-width: 992px) {
    width: 100%;
  }

  @media (min-width: 1600px) {
    width: 80%;
  }
`;
