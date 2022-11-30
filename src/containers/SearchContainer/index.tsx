import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Box from "src/components/commons/Box";
import FilterCourse from "./components/Filter";
import SearchResult from "./components/Result";

const SearchContainer = () => {
  return (
    <Box margin="40px 0">
      <Box as={Row} gutter={[20]}>
        <Col span={6}>
          <FilterCourse />
        </Col>
        <Col span={18}>
          <SearchResult />
        </Col>
      </Box>
    </Box>
  );
};

export default SearchContainer;
