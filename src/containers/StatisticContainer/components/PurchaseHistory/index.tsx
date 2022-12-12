import { Col, Row, Skeleton } from "antd";
import React, { useCallback } from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import CustomModal from "src/components/Modal";
import { CourseType } from "src/data-model/CourseTypes";
import { PaymentHistory } from "src/data-model/PaymentTypes";
import { UserType } from "src/data-model/UserTypes";
import { useModal } from "src/hooks";
import { useGetPurchasedHistory } from "src/hooks/apis";
import formatNumber from "src/utils/helpers/formatNumber";
import PurchasedDetail from "../PurchasedDetail";

interface Props {
  instructorId?: string;
}

const PurchaseHistory = ({ instructorId }: Props) => {
  const { data: historyList, isLoading } = useGetPurchasedHistory(instructorId);
  const purchasedDetailModal = useModal();

  if (isLoading) {
    return (
      <>
        {new Array(5).map((_, index) => {
          return (
            <Box key={index} padding="15px 5px">
              <Skeleton avatar active paragraph={{ rows: 1 }} />
            </Box>
          );
        })}
      </>
    );
  }

  return (
    <Box
      width="100%"
      height={450}
      padding="20px 10px 30px"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      borderRadius="large"
      className="overflow-y-auto"
    >
      <Box className="w-full flex items-center justify-between">
        <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
          History:
        </Text>
        <Box
          as={Text}
          className="cursor-pointer"
          fontSize="sm"
          fontWeight="bold"
          lineHeight="large"
          color="green"
          onClick={purchasedDetailModal.toggleModal}
        >
          View detail
        </Box>
      </Box>
      <Box as={Row} width="100%" gutter={[0, 10]} margin="20px 0 0">
        {historyList?.map((historyItem) => (
          <Col span={24} key={historyItem.id}>
            <HistoryItem history={historyItem} />
          </Col>
        ))}
      </Box>
      <PurchasedDetail modal={purchasedDetailModal} />
    </Box>
  );
};

interface HistoryItemProps {
  history: PaymentHistory & { user?: UserType; course?: CourseType };
}

const HistoryItem = ({
  history: { user, course, ...restHistory },
}: HistoryItemProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      padding="10px 5px"
      className="flex items-center"
    >
      <Box
        className="flex-shrink-0"
        width="40px"
        height="40px"
        borderRadius="rounded"
        overflow="hidden"
      >
        <ImageComponent
          fallBack="/assets/ava.png"
          src={user?.avatarUrl ?? ""}
          alt="avatar"
        />
      </Box>
      <Box margin="0 8px">
        <Text fontSize="sm" fontWeight="bold" lineHeight="large" color="text">
          {user?.fullName}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="regular"
          lineHeight="normal"
          color="text"
        >
          has bought {course?.name.slice(0, 15) + "..."}
        </Text>
      </Box>
      <Center
        bg="lightGray"
        padding="5px 15px"
        height="max-content"
        borderRadius="large"
        margin="0 0 0 auto"
      >
        <Text fontSize="sm" fontWeight="medium" color="green">
          +{formatNumber(restHistory.amount)}Vnd
        </Text>
      </Center>
    </Box>
  );
};

export default PurchaseHistory;
