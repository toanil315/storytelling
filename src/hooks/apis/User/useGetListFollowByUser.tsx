import React from "react";
import { useQuery } from "react-query";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useGetListFollowByUser = (userId: string) => {
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEYS.GET_LIST_FOLLOW_BY_USER, userId],
    () => userServices.getListFollowByUser(userId),
    {
      enabled: Boolean(userId),
    }
  );

  return {
    data: data?.data,
    pagination: data?.pagination,
    isLoading,
    isError,
  };
};

export default useGetListFollowByUser;
