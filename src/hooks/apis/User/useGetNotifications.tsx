import { useQuery } from "react-query";
import { NotificationType } from "src/data-model/NotificationTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetNotification = (
  userId: string
): UseQueryResponse<NotificationType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
    () => userServices.getAllNotifications(userId),
    {
      enabled: !!userId,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetNotification;
