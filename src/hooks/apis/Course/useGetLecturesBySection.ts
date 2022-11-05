import { useQuery } from "react-query";
import { LectureType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetLecturesBySection = (
  sectionId: string
): UseQueryResponse<LectureType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_LECTURES_IN_SECTION, sectionId],
    () => courseService.getLecturesOfSection(sectionId)
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetLecturesBySection;
