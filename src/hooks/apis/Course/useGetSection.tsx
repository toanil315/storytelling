import { useQuery } from "react-query";
import { SectionType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetSection = (courseId: string): UseQueryResponse<SectionType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_SECTIONS, courseId],
    () => courseService.getSections(courseId),
    {
      enabled: Boolean(courseId),
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetSection;
