import React, { useEffect, useState } from "react";
import CourseCard from "src/components/CourseCard";
import { HomeContainerWrapper, Section, Title } from "./style";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/data-model/CourseTypes";
import Pagination from "src/components/Pagination";
import { PaginationType } from "src/utils/types/CustomAxiosResponse";
import { usePagination } from "src/hooks";
import { DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
import Box from "src/components/commons/Box";
import { useGetUserByIdParallel } from "src/hooks/apis";
import { UserType } from "src/data-model/UserTypes";

interface Props {
  courses: CourseType[];
  pagination: PaginationType;
}

const HomeContainer = ({ courses, pagination }: Props) => {
  const { t, i18n } = useTranslation();
  const paginationHelper = usePagination({
    pageSize: DEFAULT_PAGINATION_SIZE.COURSES_SIZE,
  });
  const [usersById, setUsersById] = useState<
    { [key: string]: UserType } | undefined
  >(undefined);

  const { users, isLoading, isError } = useGetUserByIdParallel(
    courses.map((course) => course.userId)
  );

  useEffect(() => {
    if (!isLoading && !isError && users) {
      setUsersById({
        ...users.reduce((acc, current) => {
          return { ...acc, [current?.userId as string]: current };
        }, {}),
      });
    }
  }, [isLoading, isError]);

  const renderCourseList = () => {
    return courses.map((courseItem) => (
      <CourseCard
        key={courseItem.id}
        course={courseItem}
        user={usersById?.[courseItem.userId]}
      />
    ));
  };

  return (
    <HomeContainerWrapper>
      <Section>
        <Title>Popular</Title>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          {renderCourseList()}
        </div>
      </Section>
      <Box className="flex justify-end" margin="40px 0 0">
        <Pagination
          pagination={paginationHelper}
          current={paginationHelper.page}
          pageSize={paginationHelper.pageSize}
          total={pagination.total_count}
        />
      </Box>
    </HomeContainerWrapper>
  );
};

export default HomeContainer;
