import { useState } from "react";

interface InitialParams {
  pageSize: number;
  page: number;
}

export interface UseTableHelper extends InitialParams {
  onPageChange: (value: number) => void;
}

const useTable = (initialParams: InitialParams) => {
  const [page, setPage] = useState<number>(initialParams.page);
  const [pageSize, setPageSize] = useState<number>(initialParams.pageSize);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  return {
    page,
    pageSize,
    onPageChange,
  };
};

export default useTable;
