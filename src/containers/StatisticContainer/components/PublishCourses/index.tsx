import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Table from "src/components/Table";
import { publishCoursesColumn } from "../../constants/column";
import PublishCourseDetail from "../PublishCourseDetail";

const publishCourseList = [
  {
    id: "1",
    name: "English for beginners",
    thumbnail: "/assets/thumbnail-example.png",
    category: {
      id: "1",
      name: "English",
    },
    hashTags: ["english", "beginner"],
  },
];

const PublishCourses = () => {
  const { t } = useTranslation();
  const [expandedRowKey, setExpandedRowKey] = useState<string>("");

  return (
    <Box bg="white" padding="20px" borderRadius="large">
      <Table
        rowKey={(record) => record.id}
        columns={publishCoursesColumn}
        dataSource={publishCourseList}
        pagination={{
          hideOnSinglePage: true,
        }}
        expandable={{
          expandedRowKeys: [expandedRowKey],
          expandedRowRender: (record: any) => (
            <PublishCourseDetail record={record} />
          ),
          onExpand: (expanded, record) => {
            let key = "";
            if (expanded) {
              key = record.id;
            }
            setExpandedRowKey(key);
          },
        }}
      />
    </Box>
  );
};

export default PublishCourses;
