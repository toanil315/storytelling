import { Skeleton } from "antd";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { Query } from "react-query";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Input from "src/components/commons/Input";
import Text from "src/components/commons/Typography";
import ShareIcon from "src/components/icons/ShareIcon";
import { UserType } from "src/data-model/UserTypes";
import {
  useGetCommentsOfVideo,
  useGetUserByIdParallel,
  useUser,
} from "src/hooks/apis";
import useCreateComment from "src/hooks/apis/Course/useCreateComment";
import { DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
import DateTimeUtils from "src/utils/DateTimeUtils";
interface Props {
  videoId?: string;
}

const Comments = forwardRef(function Comments({ videoId }: Props, ref: any) {
  const { t } = useTranslation();
  const {
    data: comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetCommentsOfVideo(videoId ?? "");
  const { users, isLoading: isGetUserLoading } = useGetUserByIdParallel(
    comments ? comments.map((comment) => comment.userId) : []
  );

  const [usersById, setUsersById] = useState<{ [k: string]: UserType }>({});
  const { user } = useUser();
  const { createComment, isLoading: postCommentLoading } = useCreateComment();
  const [commentContent, setCommentContent] = useState<string>("");
  const scrollParentRef = useRef(null);

  useEffect(() => {
    if (users) {
      const newUsersById = users.reduce((prev, currentUser) => {
        return { ...prev, [currentUser?.userId as string]: currentUser };
      }, {});
      setUsersById(newUsersById);
    }
  }, [JSON.stringify(users)]);

  const handlePostComment = (content: string) => {
    if (content.trim()) {
      createComment({
        content,
        userId: user?.userId ?? "",
        videoId: videoId ?? "",
      });
      setCommentContent("");
    }
  };

  const handleChange = (value: string) => {
    setCommentContent(value);
  };

  const LoadingSkeleton = useCallback(
    () => (
      <>
        {new Array(DEFAULT_PAGINATION_SIZE.COMMENTS).map((_, index) => {
          return (
            <Box key={index} padding="15px 5px">
              <Skeleton avatar active paragraph={{ rows: 1 }} />
            </Box>
          );
        })}
      </>
    ),
    []
  );

  const renderComments = () => {
    return comments?.map((commentItem) => {
      return (
        <Box
          className="flex items-center"
          key={commentItem.id}
          margin="10px 0 20px"
        >
          <Box
            width="55px"
            height="55px"
            borderRadius="rounded"
            overflow="hidden"
            margin="0 10px 0 0"
          >
            <ImageComponent
              src={
                usersById[commentItem.userId]?.avatarUrl ?? "/assets/ava.png"
              }
              alt="avatar"
            />
          </Box>
          <Box>
            <Box className="flex items-center">
              <Box
                as={Text}
                fontSize="sm"
                fontWeight="bold"
                lineHeight="medium"
                color="text"
              >
                {usersById[commentItem.userId]?.fullName ?? ""}
              </Box>
              <Box
                width="5px"
                height="5px"
                borderRadius="rounded"
                bg="textLight"
                margin="0 5px "
              />
              <Text fontSize="xs" fontWeight="regular" color="textLight">
                {DateTimeUtils.convertToTimeAgo(
                  typeof commentItem.createdAt === "number"
                    ? Number(commentItem.createdAt)
                    : new Date(commentItem.createdAt).getTime()
                )}
              </Text>
            </Box>
            <Text>{commentItem.content}</Text>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box width="100%" bg="white" padding="25px 10px" borderRadius="md">
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        {t("comments")}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        style={{ gap: 15 }}
        margin="20px 0"
      >
        <Box
          width="50px"
          height="50px"
          borderRadius="rounded"
          overflow="hidden"
          flexShrink="0"
        >
          <ImageComponent src="/assets/ava.png" alt="avatar" />
        </Box>
        <Input
          handleChange={handleChange}
          value={commentContent}
          placeholder="Enter comment here"
        />
        <Button onClick={() => handlePostComment(commentContent)}>
          <ShareIcon />
        </Button>
      </Box>
      {comments?.length === 0 ? (
        <Box className="flex flex-col items-center" width="100%">
          <Box width="80%" height="200px">
            <ImageComponent src="/assets/empty.png" alt="empty" />
          </Box>
          <Text fontSize="sm" fontWeight="medium" color="text">
            There are no comments here
          </Text>
        </Box>
      ) : (
        <Box height="400px" margin="25px 0 15px" overflow="auto">
          <InfiniteScroll
            loadMore={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={undefined}
            useWindow={false}
            threshold={20}
          >
            {renderComments()}
          </InfiniteScroll>
          {(isLoading || isGetUserLoading) && hasNextPage && (
            <Box margin="15px 0">
              <LoadingSkeleton />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
});

export default Comments;
