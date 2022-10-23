import React from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Table from "src/components/Table";
import { publishCoursesColumn } from "../../constants/column";

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

  return (
    <Box bg="white" padding="20px" borderRadius="large">
      <Table
        rowKey={(record) => record.id}
        columns={publishCoursesColumn}
        dataSource={publishCourseList}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </Box>
  );
};

export default PublishCourses;
