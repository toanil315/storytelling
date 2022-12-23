import { useQuery } from "react-query";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useCheckFollow = (userId: string, instructorId: string) => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.CHECK_FOLLOWED_OR_NOT, instructorId],
    () => userServices.checkFollowedOrNot(userId, instructorId),
    {
      enabled: Boolean(userId) && Boolean(instructorId),
    }
  );

  return {
    isFollowed: Boolean(data?.data),
    isLoading,
  };
};

export default useCheckFollow;
