import Head from "next/head";
import StatisticContainer from "src/containers/StatisticContainer";
import { NextPageWithLayout } from "../../_app";

const Statistic: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Storytelling - Statistic</title>
      </Head>
      <StatisticContainer />
    </>
  );
};

export default Statistic;
