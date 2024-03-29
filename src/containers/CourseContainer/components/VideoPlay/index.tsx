import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import parser from "html-react-parser";
import { useRouter } from "next/router";
import {
  useCheckLikeVideo,
  useCountLikeOfVideo,
  useGetLectureById,
  useGetUserById,
  useLikeVideo,
  useUser,
} from "src/hooks/apis";
import ImageComponent from "src/components/commons/Image";
import Button from "src/components/commons/Button";
import ViewIcon from "src/components/icons/ViewIcon";
import LikeIcon from "src/components/icons/LikeIcon";
import { videoServices } from "src/services/VideoServices";
import moment from "moment";
import { DATE_FORMATS } from "src/utils/helpers/formatDate";
import { useDebounceWithoutDependencies } from "src/hooks";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/utils/constants";

const VideoPlay = () => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const { user: currentUser } = useUser();
  const { lectureId } = query;
  const { data: lecture, isLoading: getLectureLoading } = useGetLectureById(
    lectureId as string
  );
  const { user: authorOfVideo } = useGetUserById(lecture?.userId ?? "");
  const { data: numberOfLikes } = useCountLikeOfVideo(
    (lectureId as string) ?? ""
  );
  const { data: isLike } = useCheckLikeVideo(
    (lectureId as string) ?? "",
    currentUser?.userId ?? ""
  );
  const { likeVideo } = useLikeVideo(lectureId as string);
  let videoRef = useRef<HTMLVideoElement | null>(null);
  const { setDebounce: setDebounceUpdateVideoLastDuration } =
    useDebounceWithoutDependencies(1200);

  const handleUpdateView = (
    node: HTMLVideoElement | null,
    userId: string,
    lectureId: string
  ) => {
    videoServices
      .updateViewLecture({
        userId: userId as string,
        videoId: lectureId as string,
        lastDuration: Math.floor(Number(node?.currentTime)) / 60,
        lastestViewDate: moment(new Date()).format(DATE_FORMATS.UPDATE_VIEW),
      })
      .then(() => {
        queryClient.invalidateQueries([
          QUERY_KEYS.CHECK_FINISHED_COURSE,
          query.id,
        ]);
      });
  };

  useEffect(() => {
    const node = videoRef.current;
    const userId = currentUser?.userId ?? "";
    return () => {
      handleUpdateView(node, userId, lectureId as string);
    };
  }, [videoRef, currentUser, lectureId]);

  useEffect(() => {
    const handleGetLastDuration = async () => {
      const result = await videoServices.getLastDuration(
        lectureId as string,
        currentUser?.userId as string
      );
      if (videoRef.current) {
        videoRef.current.currentTime = result?.data?.lastDuration
          ? Number(result.data?.lastDuration) * 60
          : 0;
      }
    };

    handleGetLastDuration();
  }, [lectureId, currentUser, videoRef]);

  const handleOnTimeUpdate = () => {
    setDebounceUpdateVideoLastDuration(() => {
      if (Number(videoRef.current?.currentTime) > 1) {
        handleUpdateView(
          videoRef.current,
          currentUser?.userId ?? "",
          lectureId as string
        );
      }
    });
  };

  return (
    <Box width="100%">
      <video
        onTimeUpdate={handleOnTimeUpdate}
        ref={videoRef}
        width={"100%"}
        controls
        src={lecture?.url}
      />
      <Box
        width="100%"
        bg="white"
        padding="25px 10px"
        borderRadius="md"
        margin="25px 0 0"
      >
        <Text
          fontSize="base"
          fontWeight="medium"
          lineHeight="large"
          color="text"
        >
          {lecture?.title}
        </Text>
        <Box padding="20px 0" className="flex items-center justify-between">
          <Box width="50%" className="flex items-center">
            <Box
              width="50px"
              height="50px"
              borderRadius="rounded"
              overflow="hidden"
            >
              <ImageComponent
                src={authorOfVideo?.avatarUrl ?? ""}
                alt="avatar"
              />
            </Box>
            <Box
              as={Text}
              padding="0 20px"
              fontSize="sm"
              fontWeight="medium"
              color="text"
            >
              {authorOfVideo?.fullName}
            </Box>
          </Box>
          <Box className="flex items-center">
            <Box
              className="flex items-center"
              padding="10px 15px"
              bg="lightGray"
              borderRadius="md"
            >
              <ViewIcon />
              <Box
                as={Text}
                padding="0 0 0 10px"
                fontSize="xs"
                fontWeight="regular"
                color="text"
              >
                {lecture?.totalView} viewers
              </Box>
            </Box>
            <Box
              className="flex items-center"
              padding="10px 15px"
              bg="lightGray"
              borderRadius="md"
              margin="0 0 0 15px"
            >
              <Box
                onClick={() =>
                  likeVideo({
                    userId: currentUser?.userId ?? "",
                    videoId: lectureId as string,
                  })
                }
                className="cursor-pointer"
              >
                <LikeIcon fill={isLike ? "#F27166" : "none"} />
              </Box>
              <Box
                as={Text}
                padding="0 0 0 10px"
                fontSize="xs"
                fontWeight="regular"
                color="text"
              >
                {numberOfLikes} likes
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="flex"
          margin="10px 0"
          bg="lightGray"
          padding="15px 10px"
          borderRadius="md"
        >
          <Text
            fontSize="sm"
            fontWeight="regular"
            lineHeight="large"
            color="text"
          >
            {lecture?.description
              ? parser(JSON.parse(lecture?.description))
              : ""}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlay;
