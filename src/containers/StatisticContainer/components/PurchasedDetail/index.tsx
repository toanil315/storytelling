import React, { useMemo } from "react";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import CustomModal from "src/components/Modal";
import Table from "src/components/Table";
import { useTable } from "src/hooks";
import { useGetPurchasedHistory, useUser } from "src/hooks/apis";
import { UseModalHelper } from "src/hooks/useModal";
import { getPurchasedDetailColumns } from "../../constants/column";

interface Props {
  modal: UseModalHelper;
}

const PurchasedDetail = ({ modal: { show, closeModal } }: Props) => {
  const table = useTable({
    page: 1,
    pageSize: 5,
  });
  const { user } = useUser();
  const { data: historyList, isLoading } = useGetPurchasedHistory(
    user?.userId,
    table.page,
    table.pageSize
  );

  const columns = useMemo(() => {
    return getPurchasedDetailColumns();
  }, []);

  return (
    <CustomModal open={show} onCancel={closeModal}>
      <Box maxWidth="1000px" padding="8px">
        <Box
          as={Text}
          padding=" 0 0 10px"
          fontSize="base"
          fontWeight="bold"
          lineHeight="large"
          color="text"
        >
          Purchased Detail:
        </Box>
        <Table
          table={table}
          loading={isLoading}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={historyList}
        />
      </Box>
    </CustomModal>
  );
};

export default PurchasedDetail;
