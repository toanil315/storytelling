import React from 'react'
import VideoCard from './components/VideoCard';
import { CardItem, CardList, HomeContainerWrapper, Section, Title } from './style';
import {useTranslation} from 'react-i18next'

const HomeContainer = () => {
  const {t, i18n} = useTranslation()

  const renderPopularSection = () => {
    return <CardItem><VideoCard /></CardItem>;
  }

  return (
    <HomeContainerWrapper>
      <Section>
        <Title>Popular</Title>
        <CardList>
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
          {renderPopularSection()}
        </CardList>
      </Section>
    </HomeContainerWrapper>
  )
}

export default HomeContainer