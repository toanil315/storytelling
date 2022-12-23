import { useQuery } from "react-query";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";

const useGetAttendanceByMonth = (courseId: string) => {
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEYS.GET_ATTENDANCE_BY_MONTH, courseId],
    () => courseService.getAttendanceByMonth(courseId),
    { enabled: Boolean(courseId) }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
  };
};

export default useGetAttendanceByMonth;
