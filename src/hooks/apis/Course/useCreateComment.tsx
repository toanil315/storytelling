import { useMutation, useQueryClient } from "react-query";
import { courseService } from "src/services/CourseServices";
import { CourseType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CommentBase } from "src/data-model/CommentTypes";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";

const useCreateComment = (): {
  createComment: (commentData: CommentBase) => void;
  data?: CourseType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    videoServices.postComment,
    {
      onMutate: async (newComment: CommentBase) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_COMMENTS_OF_VIDEO, newComment.videoId],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.GET_COMMENTS_OF_VIDEO,
          newComment.videoId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.GET_COMMENTS_OF_VIDEO, newComment.videoId],
          (old: any) => {
            const newCommentList = [...old.pages];
            newCommentList[0].data = [newComment, ...newCommentList[0].data];
            return {
              ...old,
              pages: newCommentList,
            };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      onError: (err, newComment, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_COMMENTS_OF_VIDEO, newComment.videoId],
          context?.previousSections
        );
      },
      // Always refetch after error or success:
      onSettled: (newComment) => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.GET_COMMENTS_OF_VIDEO,
            newComment?.data.videoId,
          ],
        });
      },
    }
  );

  return {
    createComment: (commentData: CommentBase) => {
      return mutate(commentData);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateComment;
