import { useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";

const useGetCoursesByInstructor = (
  instructorId?: string,
  page?: number,
  pageSize?: number
) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery(
    [QUERY_KEYS.GET_COURSES_BY_INSTRUCTOR, instructorId, page, pageSize],
    () =>
      courseService.getCourseByInstructor(
        instructorId ?? "",
        page ?? 1,
        pageSize ?? 5
      ),
    {
      enabled: !!instructorId,
      keepPreviousData: true,
    }
  );

  console.log(page);

  return {
    data: data?.data,
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  };
};

export default useGetCoursesByInstructor;
