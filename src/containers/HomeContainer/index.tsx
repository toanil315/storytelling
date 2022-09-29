import React from "react";
import VideoCard from "src/components/VideoCard";
import { HomeContainerWrapper, Section, Title } from "./style";
import { useTranslation } from "react-i18next";

const HomeContainer = () => {
  const { t, i18n } = useTranslation();

  const renderPopularSection = () => {
    return <VideoCard />;
  };

  return (
    <HomeContainerWrapper>
      <Section>
        <Title>Popular</Title>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
        </div>
      </Section>
    </HomeContainerWrapper>
  );
};

export default HomeContainer;
