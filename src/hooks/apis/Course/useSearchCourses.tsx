import React from "react";
import { useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import useLazyQuery from "src/hooks/useLazyQuery";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";

const useSearchCourses = (queryParams: { [key: string]: any }) => {
  const [trigger, { data, isLoading, isError }] = useLazyQuery(
    [QUERY_KEYS.SEARCH_COURSES, Object.values(queryParams)],
    () => courseService.searchCourses(queryParams)
  );

  return {
    searchCourses: () => {
      trigger();
    },
    data: (data as any)?.data.courses as CourseType[] | undefined,
    isLoading,
    isError,
  };
};

export default useSearchCourses;
