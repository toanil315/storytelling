import { useQuery } from "react-query";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";

const useCheckFinishedCourse = (userId: string, courseId: string) => {
  const { data } = useQuery(
    [QUERY_KEYS.CHECK_FINISHED_COURSE, courseId],
    () =>
      courseService.checkFinishedCourse({
        userId,
        courseId,
      }),
    {
      enabled: Boolean(userId) && Boolean(courseId),
    }
  );

  return {
    isFinishCourse: Boolean(data?.data?.check_done),
  };
};

export default useCheckFinishedCourse;
