import { useQuery } from "react-query";
import { CategoryType } from "src/data-model/CourseTypes";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetCategory = (): UseQueryResponse<CategoryType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_CATEGORY,
    courseService.getCategories,
    {
      staleTime: 900000, // 15 min
      cacheTime: 1800000, // 30 min
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetCategory;
