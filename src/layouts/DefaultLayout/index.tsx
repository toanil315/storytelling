import React from 'react'
import Searchbar from './components/Searchbar'
import StyledSidebar from './components/Sidebar'
import { ContentWrapper, Header, DefaultLayoutWrapper, Container } from './styles'
import VoiceIcon from 'src/components/icons/VoiceIcon';
import GlobalIcon from 'src/components/icons/GlobalIcon';
import UploadIcon from 'src/components/icons/UploadIcon';
import NotificationIcon from 'src/components/icons/NotificationIcon'
import NotificationIcon2 from 'src/components/icons/NotificationIcon2'
import Button from 'src/components/commons/Button';

interface Props {
    children: React.ReactNode;
}

const DefaultLayout  = ({children}: Props) => {
  return (
    <DefaultLayoutWrapper>
        <StyledSidebar />
        <ContentWrapper width='85%'>
            <Container>
              <Header>
                <div>
                  <Searchbar />
                  <VoiceIcon />
                </div>
                <div>
                  <GlobalIcon />
                  <NotificationIcon />
                  <Button $type='white'>
                    <UploadIcon />
                    Upload
                  </Button>
                </div>
              </Header>
              <div className='content'>
                  {children}
              </div>
            </Container>
        </ContentWrapper>
    </DefaultLayoutWrapper>
  )
}

export default DefaultLayout