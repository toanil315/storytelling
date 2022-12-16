/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * NOTE: If using this with `next` version 12.2.0 or lower, uncomment the
 * penultimate line in `CustomErrorComponent`.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/router";
import ImageComponent from "src/components/commons/Image";
import Center from "src/components/commons/Center";
import Button from "src/components/commons/Button";
import { Path } from "src/utils/Path";
import Box from "src/components/commons/Box";

const CustomErrorComponent = (props) => {
  // If you're using a Nextjs version prior to 12.2.1, uncomment this to
  // compensate for https://github.com/vercel/next.js/issues/8592
  Sentry.captureUnderscoreErrorException(props);

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

CustomErrorComponent.getLayout = function getLayout(page) {
  return page;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  const { res, err } = contextData;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorComponent;
