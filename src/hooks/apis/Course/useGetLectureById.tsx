import { useQuery } from "react-query";
import { LectureType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetLectureById = (
  lectureId?: string
): UseQueryResponse<LectureType> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_LECTURE_DETAIL, lectureId],
    () => courseService.getLectureById(lectureId ?? ""),
    {
      enabled: Boolean(lectureId),
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetLectureById;
