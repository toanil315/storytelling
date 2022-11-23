import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface PaginationInitialParams {
  pageSize: number;
}

export interface UsePaginationHelper {
  page: number;
  pageSize: number;
  onChange: (page: any, pageSize: any) => void;
}

const usePagination = (
  initialParams: PaginationInitialParams
): UsePaginationHelper => {
  const router = useRouter();
  const { page } = router.query;

  const setPagination = (page: number) => {
    router.replace({
      query: {
        ...router.query,
        page: page ? String(page) : "1",
      },
    });
  };

  // /* eslint-disable */
  // useEffect(() => {
  //   setPagination(Number(page));
  // }, []);
  // /* eslint-enable */

  return {
    page: page ? Number(page) : 1,
    pageSize: Number(initialParams.pageSize),
    onChange: (page: any, pageSize: any) => setPagination(Number(page)),
  };
};

export default usePagination;
