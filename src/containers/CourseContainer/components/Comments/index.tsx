import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Input from "src/components/commons/Input";
import Text from "src/components/commons/Typography";
import ShareIcon from "src/components/icons/ShareIcon";
import { useGetCommentsOfVideo, useUser } from "src/hooks/apis";
import useCreateComment from "src/hooks/apis/Course/useCreateComment";
interface Props {
  videoId?: string;
}

const Comments = ({ videoId }: Props) => {
  const { t } = useTranslation();
  const { data: comments, isLoading } = useGetCommentsOfVideo(videoId ?? "");
  const { user } = useUser();
  const { createComment, isLoading: postCommentLoading } = useCreateComment();
  const [commentContent, setCommentContent] = useState<string>("");

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderComments = () => {
    return comments?.map((commentItem) => {
      return (
        <Box key={commentItem.id} margin="10px 0">
          <Text>{commentItem.content}</Text>
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
        <Box margin="15px 0">{renderComments()}</Box>
      )}
    </Box>
  );
};

export default Comments;
