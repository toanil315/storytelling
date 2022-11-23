import { Query, useQueries, useQuery } from "react-query";
import { UserType } from "src/data-model/UserTypes";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

export const useGetUserById = (
  userId: string
): {
  user?: UserType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_USER_BY_ID, userId],
    () => userServices.getUserById(userId)
  );

  return {
    user: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetUserByIdParallel = (
  userIds: string[]
): {
  users?: (UserType | undefined)[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const queries = useQueries(
    userIds.map((userId) => {
      return {
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn: () => userServices.getUserById(userId),
        enabled: !!userId,
      };
    })
  );

  return {
    users: queries.map(({ data }) => {
      return data?.data;
    }),
    isLoading: queries.some((data) => data.isLoading),
    isError: queries.some((data) => data.isError),
    isSuccess: queries.some((data) => data.isSuccess),
  };
};
