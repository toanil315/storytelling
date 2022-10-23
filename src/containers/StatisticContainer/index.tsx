import { Col, Row } from "antd";
import React from "react";
import Box from "src/components/commons/Box";
import PurchaseHistory from "./components/PurchaseHistory";
import IncomeChart from "./components/IncomeChart";
import Overview from "./components/Overview";
import PublishCourses from "./components/PublishCourses";

const StatisticContainer = () => {
  return (
    <Box>
      <Overview />
      <Box as={Row} width="calc(100% + 30px)" gutter={[30, 30]} margin="20px 0">
        <Col span={16}>
          <IncomeChart />
        </Col>
        <Col span={8}>
          <PurchaseHistory />
        </Col>
      </Box>
      <Box margin="30px 0">
        <PublishCourses />
      </Box>
    </Box>
  );
};

export default StatisticContainer;
