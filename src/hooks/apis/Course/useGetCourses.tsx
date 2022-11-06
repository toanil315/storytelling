import { useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetCourses = (): UseQueryResponse<CourseType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_COURSES,
    courseService.getCourses
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetCourses;
