import React from "react";
import { useQuery } from "react-query";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useCountLikeOfVideo = (videoId: string): UseQueryResponse<number> => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    [QUERY_KEYS.COUNT_LIKE_OF_VIDEO, videoId],
    () => videoServices.countLikesOfVideo(videoId),
    {
      enabled: Boolean(videoId),
    }
  );

  return {
    data: data?.pagination.total_count,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCountLikeOfVideo;
