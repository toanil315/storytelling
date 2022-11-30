import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import withAuth from "src/components/HOC/withAuth";

const SearchContainer = dynamic(
  () => import("src/containers/SearchContainer"),
  {
    ssr: false,
  }
);

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Storytelling</title>
      </Head>
      <SearchContainer />
    </>
  );
};

export default SearchPage;
