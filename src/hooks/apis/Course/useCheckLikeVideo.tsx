import { useQuery } from "react-query";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";

const useCheckLikeVideo = (videoId: string, userId: string) => {
  const { data } = useQuery(
    [QUERY_KEYS.CHECK_IS_LIKED_VIDEO, videoId, userId],
    () => videoServices.checkLikedVideo(videoId, userId),
    {
      enabled: Boolean(videoId) && Boolean(userId),
    }
  );

  return {
    data: Boolean(data?.data),
  };
};

export default useCheckLikeVideo;
