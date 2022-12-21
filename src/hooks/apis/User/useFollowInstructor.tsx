import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useFollowInstructor = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { mutate, isLoading, isError } = useMutation(
    userServices.followInstructor,
    {
      onSuccess: (_, { instructorId, userId }) => {
        const followedInstructor: any | undefined = queryClient.getQueryData([
          QUERY_KEYS.GET_USER_BY_ID,
          instructorId,
        ]);
        const followList: any[] | undefined = queryClient.getQueryData([
          QUERY_KEYS.GET_LIST_FOLLOW_BY_USER,
          userId,
        ]);
        queryClient.setQueryData(
          [QUERY_KEYS.GET_LIST_FOLLOW_BY_USER, userId],
          (old: any) => {
            return {
              ...old,
              data: {
                data: {
                  data: [
                    ...(followList ?? []),
                    {
                      instructorResponse: followedInstructor?.data,
                    },
                  ],
                },
              },
            };
          }
        );
        toast.success(t("toast.success.followInstructor"));
      },
      onError: () => {
        toast.error(t("toast.error.followInstructor"));
      },
    }
  );

  return {
    follow: (userId: string, instructorId: string) => {
      return userId && instructorId && mutate({ userId, instructorId });
    },
    isLoading,
    isError,
  };
};

export default useFollowInstructor;
