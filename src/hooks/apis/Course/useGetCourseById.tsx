import { useQueries, useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

export const useGetCourseById = (
  courseId?: string
): UseQueryResponse<CourseType> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_COURSE_DETAIL, courseId],
    () => courseService.getCourseById(courseId ?? ""),
    {
      enabled: !!courseId,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetCourseByIdParallel = (
  courseIds: string[]
): {
  courses?: (CourseType | undefined)[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const queries = useQueries(
    courseIds.map((courseId) => {
      return {
        queryKey: [QUERY_KEYS.GET_COURSE_DETAIL, courseId],
        queryFn: () => courseService.getCourseById(courseId),
        enabled: !!courseId,
      };
    })
  );

  return {
    courses: queries.map(({ data }) => {
      return data?.data;
    }),
    isLoading: queries.some((data) => data.isLoading),
    isError: queries.some((data) => data.isError),
    isSuccess: queries.some((data) => data.isSuccess),
  };
};
