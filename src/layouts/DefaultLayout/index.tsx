import React, { useEffect, useRef } from "react";
import Header from "./components/Header";
import StyledSidebar from "./components/Sidebar";
import { ContentWrapper, DefaultLayoutWrapper, Container } from "./styles";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <DefaultLayoutWrapper>
      <StyledSidebar />
      <ContentWrapper id="body" width="85%">
        <Container>
          <Header />
          <div className="content">{children}</div>
        </Container>
      </ContentWrapper>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
