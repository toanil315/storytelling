import { Col, Row } from "antd";
import React from "react";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import PlayIcon from "src/components/icons/PlayIcon";
import SolidDropDownIcon from "src/components/icons/SolidDropDownIcon";

const Overview = () => {
  return (
    <Box as={Row} width="calc(100% + 30px)" gutter={[30, 0]}>
      <Col span={8}>
        <OverviewItem />
      </Col>
      <Col span={8}>
        <OverviewItem />
      </Col>
      <Col span={8}>
        <OverviewItem />
      </Col>
    </Box>
  );
};

const OverviewItem = () => {
  return (
    <Box
      padding="20px"
      border="1px solid"
      borderColor="lightGray"
      bg="white"
      borderRadius="large"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text
            fontSize="base"
            fontWeight="bold"
            lineHeight="large"
            color="text"
          >
            Courses:
          </Text>
          <Box display="flex" alignItems="flex-end" margin="6px 0">
            <Box
              as={Text}
              fontSize="xl"
              fontWeight="medium"
              color="text"
              lineHeight="1"
              padding="0 6px 0 0"
            >
              50
            </Box>
            <Text fontSize="sm" fontWeight="bold" color="green">
              + 4%
            </Text>
          </Box>
        </Box>
        <PlayIcon width="30px" height="30px" />
      </Box>
    </Box>
  );
};

export default Overview;
