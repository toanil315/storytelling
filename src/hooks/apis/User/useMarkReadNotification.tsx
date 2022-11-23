import { useMutation, useQueryClient } from "react-query";
import { NotificationType } from "src/data-model/NotificationTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";
import useUser from "../Auth/useUser";

const useMarkReadNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    userServices.markReadNotification,
    {
      onMutate: async (notificationId) => {
        const userId = user?.userId;
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID,
          userId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
          (old: any) => {
            const allReadNotifications = old.pages.map(
              (pageNotification: { data: NotificationType[] }) => {
                return {
                  ...pageNotification,
                  data: pageNotification.data.map((notification) => {
                    return {
                      ...notification,
                      read:
                        notification.id === notificationId
                          ? true
                          : notification.read,
                    };
                  }),
                };
              }
            );
            return {
              ...old,
              pages: [...allReadNotifications],
            };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      onError: (err, userId, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
          context?.previousSections
        );
      },
      // // Always refetch after error or success:
      // onSettled: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, userId],
      //   });
      // },
    }
  );

  return {
    markReadNotification: (notificationId: string) => {
      return mutate(notificationId);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useMarkReadNotification;
