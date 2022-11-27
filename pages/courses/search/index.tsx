import Head from "next/head";
import React from "react";
import withAuth from "src/components/HOC/withAuth";
import SearchContainer from "src/containers/SearchContainer";

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
