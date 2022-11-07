import Head from "next/head";
import { NextPageWithLayout } from "../../_app";
import dynamic from "next/dynamic";

const StatisticContainer = dynamic(
  () => import("src/containers/StatisticContainer"),
  {
    ssr: false,
  }
);

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
