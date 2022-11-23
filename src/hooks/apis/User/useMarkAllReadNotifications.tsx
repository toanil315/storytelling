import { useMutation, useQueryClient } from "react-query";
import { NotificationType } from "src/data-model/NotificationTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useMarkAllReadNotification = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    userServices.markAllReadNotification,
    {
      onMutate: async (userId) => {
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
                      read: true,
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
    markAllReadNotification: (userId: string) => {
      return mutate(userId);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useMarkAllReadNotification;
