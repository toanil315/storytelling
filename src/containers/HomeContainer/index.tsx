import React from "react";
import CourseCard from "src/components/CourseCard";
import { HomeContainerWrapper, Section, Title } from "./style";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/data-model/CourseTypes";
import Pagination from "src/components/Pagination";
import { PaginationType } from "src/utils/types/CustomAxiosReponse";
import { usePagination } from "src/hooks";
import { DEFAULT_PAGINATION_SIZE_IN_PAGES } from "src/utils/constants";
import Box from "src/components/commons/Box";

interface Props {
  courses: CourseType[];
  pagination: PaginationType;
}

const HomeContainer = ({ courses, pagination }: Props) => {
  const { t, i18n } = useTranslation();
  const paginationHelper = usePagination({
    pageSize: DEFAULT_PAGINATION_SIZE_IN_PAGES,
  });

  const renderCourseList = () => {
    return courses.map((courseItem) => (
      <CourseCard key={courseItem.id} course={courseItem} />
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
