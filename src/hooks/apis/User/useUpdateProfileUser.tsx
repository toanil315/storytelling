import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { UserDetail } from "src/data-model/UserTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useUpdateProfileUser = (): {
  updateProfile: (userData: UserDetail) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    userServices.updateProfileUser,
    {
      onSuccess: () => {
        toast.success(t("toast.success.updateUserProfile"));
      },
      onMutate: async (newUserData: UserDetail) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_ME],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([QUERY_KEYS.GET_ME]);

        // Optimistically update to the new value
        queryClient.setQueryData([QUERY_KEYS.GET_ME], (old: any) => {
          return {
            ...old,
            data: { ...old.data, ...newUserData },
          };
        });

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      onError: (_, _1, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_ME],
          context?.previousSections
        );
        toast.error(t("toast.error.updateUserProfile"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ME],
        });
      },
    }
  );

  return {
    updateProfile: (userData: UserDetail) => {
      return mutate(userData);
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUpdateProfileUser;
