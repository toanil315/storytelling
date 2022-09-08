import React from 'react'
import VideoCard from './components/VideoCard';
import { HomeContainerWrapper, Section, Title } from './style';

const HomeContainer = () => {
  const renderPopularSection = () => {
    return <VideoCard />;
  }

  return (
    <HomeContainerWrapper>
      <Section>
        <Title>Popular Videos</Title>
        {renderPopularSection()}
      </Section>
    </HomeContainerWrapper>
  )
}

export default HomeContainer