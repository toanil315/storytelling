import { color } from "src/utils/colors";
import styled from "styled-components";
import HeaderImage from "public/assets/Background.png";

interface ContentWrapperProps {
  width?: string;
}

export const DefaultLayoutWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  width: ${({ width }) => width ?? "85%"};
  height: 100vh;
  background-color: ${color.lightGray};
  background-image: url(${HeaderImage.src});
  background-repeat: no-repeat;
  background-position: -126px -30px;
  overflow-y: auto;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px 25px;

  & > .content {
    margin-top: 25px;
  }

  @media(min-width: 992px) {
    width: 100%;
  }

  @media(min-width: 1600px) {
    width: 80%;
  }
`;

export const Header = styled.div`
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