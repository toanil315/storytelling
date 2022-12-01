import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { LikeBase, LikeType } from "src/data-model/LikeTypes";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";
import useUser from "../Auth/useUser";
import useCheckLikeVideo from "./useCheckLikeVideo";

const useLikeVideo = (videoId: string) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { data: isLike } = useCheckLikeVideo(videoId, user?.userId ?? "");

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    videoServices.likeVideo,
    {
      onMutate: async (like: LikeBase) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [
            [QUERY_KEYS.COUNT_LIKE_OF_VIDEO, like.videoId],
            [QUERY_KEYS.CHECK_IS_LIKED_VIDEO, like.videoId, like.userId],
          ],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.COUNT_LIKE_OF_VIDEO,
          like.videoId,
        ]);

        // Snapshot the previous value
        const previousIsLike = queryClient.getQueryData([
          QUERY_KEYS.CHECK_IS_LIKED_VIDEO,
          like.videoId,
          like.userId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.COUNT_LIKE_OF_VIDEO, like.videoId],
          (old: any) => {
            const newLikeList = [...old.data];
            if (!isLike) {
              newLikeList.push({ id: Date.now() });
            } else {
              newLikeList.pop();
            }
            return {
              ...old,
              data: newLikeList,
            };
          }
        );

        queryClient.setQueryData(
          [QUERY_KEYS.CHECK_IS_LIKED_VIDEO, like.videoId, like.userId],
          (old: any) => {
            return {
              ...old,
              data: !isLike,
            };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections, previousIsLike };
      },
      onError: (err, like, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.COUNT_LIKE_OF_VIDEO, like.videoId],
          context?.previousSections
        );

        queryClient.setQueryData(
          [QUERY_KEYS.CHECK_IS_LIKED_VIDEO, like.videoId, like.userId],
          context?.previousIsLike
        );
      },
      // Always refetch after error or success:
      onSettled: (_, _2, like) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.COUNT_LIKE_OF_VIDEO, like.videoId],
        });
      },
    }
  );

  return {
    likeVideo: (likeData: LikeBase) => {
      return mutate(likeData);
    },
    isLoading,
    isError,
  };
};

export default useLikeVideo;
