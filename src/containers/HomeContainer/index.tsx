import React from 'react'
import VideoCard from './components/VideoCard';
import { HomeContainerWrapper, Section, Title } from './style';
import {useTranslation} from 'react-i18next'

const HomeContainer = () => {
  const {t, i18n} = useTranslation()

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