import { useMemo } from "react";
import { useQuery } from "react-query";
import { CourseType } from "src/data-model/CourseTypes";
import { UserType } from "src/data-model/UserTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";
import { useGetCourseByIdParallel } from "../Course/useGetCourseById";
import { useGetUserByIdParallel } from "../User/useGetUserById";

const useGetPurchasedHistory = (
  instructorId?: string,
  page?: number,
  pageSize?: number
) => {
  const {
    data: purchasedHistory,
    isLoading: getHistoryLoading,
    isError,
    isSuccess,
  } = useQuery(
    QUERY_KEYS.GET_PURCHASED_HISTORY,
    () =>
      userServices.getPurchasedHistoryOfInstructor(
        instructorId ?? "",
        page,
        pageSize
      ),
    {
      enabled: Boolean(instructorId),
    }
  );

  const { users, isLoading: getUsersLoading } = useGetUserByIdParallel(
    purchasedHistory
      ? purchasedHistory.data.map((historyItem) => {
          return historyItem.userId;
        })
      : [""]
  );

  const { courses, isLoading: getCoursesLoading } = useGetCourseByIdParallel(
    purchasedHistory
      ? purchasedHistory.data.map((historyItem) => {
          return historyItem.courseId;
        })
      : [""]
  );

  const usersById: { [k: string]: UserType } = useMemo(() => {
    if (users) {
      return users.reduce((acc, currentUser) => {
        if (Boolean(currentUser)) {
          return {
            ...acc,
            [currentUser?.userId as string]: currentUser,
          };
        }
        return acc;
      }, {});
    }
    return {};
  }, [JSON.stringify(users)]);

  const coursesById: { [k: string]: CourseType } = useMemo(() => {
    if (courses) {
      return courses.reduce((acc, currentCourse) => {
        if (Boolean(currentCourse)) {
          return {
            ...acc,
            [currentCourse?.id as string]: currentCourse,
          };
        }
        return acc;
      }, {});
    }
    return {};
  }, [JSON.stringify(courses)]);

  return {
    data: instructorId
      ? purchasedHistory?.data.map((historyItem) => {
          return {
            ...historyItem,
            course: coursesById[historyItem.courseId],
            user: usersById[historyItem.userId],
          };
        })
      : undefined,
    isLoading: getHistoryLoading || getHistoryLoading || getCoursesLoading,
    isError,
    isSuccess,
  };
};

export default useGetPurchasedHistory;
