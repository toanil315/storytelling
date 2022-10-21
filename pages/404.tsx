import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import ImageComponent from "src/components/commons/Image";
import Center from "src/components/commons/Center";
import Button from "src/components/commons/Button";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import Box from "src/components/commons/Box";

const ErrorPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Center
      padding="20px 0px 150px"
      flexDirection="column"
      width="100vw"
      height="100vh"
    >
      <ImageComponent src="/assets/404.png" alt="404 error" />
      <Box as={Button} width="200px" onClick={() => router.push(Path.home)}>
        Go Back
      </Box>
    </Center>
  );
};

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default ErrorPage;
