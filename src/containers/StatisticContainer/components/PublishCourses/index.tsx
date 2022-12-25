import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import Table from "src/components/Table";
import { useTable } from "src/hooks";
import {
  useGetCategory,
  useGetCoursesByInstructor,
  useUser,
} from "src/hooks/apis";
import { getPublishCoursesColumn } from "../../constants/column";
import PublishCourseDetail from "../PublishCourseDetail";

const PublishCourses = () => {
  const table = useTable({
    page: 1,
    pageSize: 5,
  });

  const { t } = useTranslation();
  const { user } = useUser();
  const {
    data: publishCourseList,
    pagination,
    isLoading: getCourseLoading,
    isFetching: getCourseFetching,
  } = useGetCoursesByInstructor(user?.userId, table.page, table.pageSize);
  const { data: categories, isLoading: getCategoryLoading } = useGetCategory();

  const [expandedRowKey, setExpandedRowKey] = useState<string>("");

  const column = useMemo(
    () => getPublishCoursesColumn(categories),
    [categories]
  );

  return (
    <Box bg="white" padding="20px" borderRadius="large" className="shadow-md">
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
        loading={getCourseLoading || getCategoryLoading || getCourseFetching}
        rowKey={(record) => record.id}
        columns={column}
        dataSource={publishCourseList}
        table={table}
        total={pagination?.total_count}
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
