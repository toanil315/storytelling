import { useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetCoursesByInstructor = (
  instructorId?: string
): UseQueryResponse<CourseType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_COURSES_BY_INSTRUCTOR, instructorId],
    () => courseService.getCourseByInstructor(instructorId ?? ""),
    {
      enabled: !!instructorId,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetCoursesByInstructor;
