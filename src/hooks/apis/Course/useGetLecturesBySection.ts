import { useQueries, useQuery } from "react-query";
import { LectureType, SectionType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { CustomAxiosResponse } from "src/utils/types/CustomAxiosResponse";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

export const useGetLecturesBySection = (
  sectionId: string
): UseQueryResponse<LectureType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_LECTURES_IN_SECTION, sectionId],
    () => courseService.getLecturesOfSection(sectionId),
    {
      enabled: Boolean(sectionId),
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetLecturesBySectionParallel = (
  sections: SectionType[]
): UseQueryResponse<CustomAxiosResponse<LectureType[]>>[] => {
  console.log(sections);
  const lecturesQueries = useQueries(
    sections.map((section) => {
      return {
        queryKey: [QUERY_KEYS.GET_LECTURES_IN_SECTION, section.id],
        queryFn: () => courseService.getLecturesOfSection(section.id),
      };
    })
  );
  return lecturesQueries;
};
