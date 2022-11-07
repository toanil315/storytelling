import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import Table from "src/components/Table";
import {
  useGetCategory,
  useGetCoursesByInstructor,
  useUser,
} from "src/hooks/apis";
import { getPublishCoursesColumn } from "../../constants/column";
import PublishCourseDetail from "../PublishCourseDetail";

const PublishCourses = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data: publishCourseList, isLoading: getCourseLoading } =
    useGetCoursesByInstructor(user?.userId);
  const { data: categories, isLoading: getCategoryLoading } = useGetCategory();

  const [expandedRowKey, setExpandedRowKey] = useState<string>("");

  const column = useMemo(
    () => getPublishCoursesColumn(categories),
    [categories]
  );

  return (
    <Box bg="white" padding="20px" borderRadius="large">
      <Box
        as={Text}
        padding="0 0 15px"
        fontSize="base"
        fontWeight="bold"
        lineHeight="large"
        color="text"
      >
        Publish Courses:
      </Box>
      <Table
        loading={getCourseLoading || getCategoryLoading}
        rowKey={(record) => record.id}
        columns={column}
        dataSource={publishCourseList}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
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
