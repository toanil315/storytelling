import { useQuery } from "react-query";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";
import { useGetCourseByIdParallel } from "./useGetCourseById";

const useGetMyPurchasedCourses = (userId?: string) => {
  const {
    data: purchasedHistory,
    isLoading: getHistoryLoading,
    isError,
  } = useQuery(
    QUERY_KEYS.GET_MY_PURCHASED_COURSES,
    () => userServices.getPurchasesOfUser(userId ?? ""),
    {
      enabled: Boolean(userId),
    }
  );

  const { courses, isLoading: getCoursesLoading } = useGetCourseByIdParallel(
    purchasedHistory
      ? purchasedHistory.data.map((historyItem) => {
          return historyItem.courseId;
        })
      : [""]
  );

  return {
    data: courses,
    isLoading: getHistoryLoading || getCoursesLoading,
    isError,
  };
};

export default useGetMyPurchasedCourses;
