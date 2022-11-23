import { useInfiniteQuery } from "react-query";
import { CommentType } from "src/data-model/CommentTypes";
import { videoServices } from "src/services/VideoServices";
import { QUERY_KEYS } from "src/utils/constants";
import { UseInfinityQueryResponse } from "src/utils/types/UseQueryHookResponse";

const useGetCommentsOfCourse = (
  videoId: string
): UseInfinityQueryResponse<CommentType[]> => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERY_KEYS.GET_COMMENTS_OF_VIDEO, videoId],
    ({ pageParam = 1 }) => videoServices.getComments(videoId, pageParam),
    {
      enabled: Boolean(videoId),
      getNextPageParam: ({ pagination }, pages) => {
        return pagination.current_page &&
          pagination.current_page < pagination.total_pages
          ? pagination.next_page
          : undefined;
      },
    }
  );

  return {
    data: data?.pages.reduce((result, pageComments) => {
      return [
        ...result,
        ...pageComments.data.map((comment) => {
          return comment;
        }),
      ];
    }, [] as CommentType[]),
    isLoading: isFetching || isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  };
};

export default useGetCommentsOfCourse;
