import { useQuery } from "react-query";
import { CommentType } from "src/data-model/CommentTypes";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetCommentsOfCourse = (
  videoId: string
): UseQueryResponse<CommentType[]> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.GET_COMMENTS_OF_VIDEO, videoId],
    () => videoServices.getComments(videoId),
    {
      enabled: !!videoId,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetCommentsOfCourse;
