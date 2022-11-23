import { notification } from "antd";
import { useInfiniteQuery, useQuery } from "react-query";
import { NotificationType } from "src/data-model/NotificationTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseInfinityQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetNotification = (
  userId: string
): UseInfinityQueryResponse<NotificationType[]> => {
  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    isSuccess,
  } = useInfiniteQuery(
    [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
    ({ pageParam = 1 }) => userServices.getAllNotifications(userId, pageParam),
    {
      enabled: !!userId,
      getNextPageParam: ({ pagination }, pages) => {
        return pagination.current_page &&
          pagination.current_page < pagination.total_pages
          ? pagination.next_page
          : undefined;
      },
    }
  );

  return {
    data: data?.pages.reduce((result, pageNotification) => {
      return [
        ...result,
        ...pageNotification.data
          .filter((item) => item.senderId !== userId)
          .map((notification) => {
            return notification;
          }),
      ];
    }, [] as NotificationType[]),
    isLoading: isFetching || isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  };
};

export default useGetNotification;
