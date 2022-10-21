import { Col, Row } from "antd";
import React from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";

const historyList = [
  {
    id: "1",
    user: {
      name: "Amad Dias",
    },
    course: {
      id: "1",
      name: "English for beginners",
      price: 22,
    },
  },
  {
    id: "2",
    user: {
      name: "Amad Dias",
    },
    course: {
      id: "2",
      name: "English for adults",
      price: 22,
    },
  },
];

const PurchaseHistory = () => {
  return (
    <Box
      width="100%"
      height={450}
      padding="20px 20px 30px"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      borderRadius="large"
    >
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        History:
      </Text>
      <Box as={Row} width="100%" gutter={[0, 10]} margin="20px 0 0">
        {historyList.map((historyItem) => (
          <Col span={24} key={historyItem.id}>
            <HistoryItem history={historyItem} />
          </Col>
        ))}
      </Box>
    </Box>
  );
};

interface HistoryItemProps {
  history: {
    id: string;
    user: {
      name: string;
    };
    course: {
      id: string;
      name: string;
      price: number;
    };
  };
}

const HistoryItem = ({ history: { user, course } }: HistoryItemProps) => {
  return (
    <Box display="flex" alignItems="center" width="100%" padding="10px 5px">
      <Box width="40px" height="40px" borderRadius="rounded" overflow="hidden">
        <ImageComponent src="/assets/ava.png" alt="avatar" />
      </Box>
      <Box margin="0 8px">
        <Text fontSize="sm" fontWeight="bold" lineHeight="large" color="text">
          {user.name}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="regular"
          lineHeight="normal"
          color="text"
        >
          has bought {course.name}
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
          + {course.price}$
        </Text>
      </Center>
    </Box>
  );
};

export default PurchaseHistory;
