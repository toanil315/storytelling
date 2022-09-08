import Head from 'next/head'
import { ReactElement } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import HomeContainer from '../src/containers/HomeContainer'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Storytelling</title>
      </Head>
      <HomeContainer />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home
