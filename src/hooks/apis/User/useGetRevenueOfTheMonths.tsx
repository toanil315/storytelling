import { useQuery } from "react-query";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useGetRevenueOfTheMonths = (instructorId?: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_REVENUE_OF_THE_MONTH,
    () => userServices.getEarningDataOfInstructor(instructorId ?? ""),
    {
      enabled: Boolean(instructorId),
    }
  );

  return {
    data: data?.data,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useGetRevenueOfTheMonths;
