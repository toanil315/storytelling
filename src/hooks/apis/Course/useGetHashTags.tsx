import { useQuery } from "react-query";
import { HashTagType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetHashTag = (): UseQueryResponse<HashTagType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_HASH_TAGS,
    courseService.getHashTags
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetHashTag;
