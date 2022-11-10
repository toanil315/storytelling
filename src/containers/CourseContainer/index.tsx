import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "src/components/commons/Box";
import { LectureType } from "src/data-model/CourseTypes";
import {
  useGetCourseById,
  useGetLecturesBySection,
  useGetSection,
} from "src/hooks/apis";
import Comments from "./components/Comments";
import VideoPlay from "./components/VideoPlay";
import VideoPlayList from "./components/VideoPlayList";

interface Props {
  courseId: string;
}

const CourseContainer = ({ courseId }: Props) => {
  const router = useRouter();
  const { data: sections, isLoading: getSectionsLoading } =
    useGetSection(courseId);
  const { data: lectures, isLoading: getLecturesLoading } =
    useGetLecturesBySection(sections?.[0]?.id ?? "");

  useEffect(() => {
    if (!router.query.lectureId) {
      router.replace({
        query: {
          ...router.query,
          lectureId: lectures?.[0].id,
        },
      });
    }
  }, [router.query.lectureId, router, lectures]);

  useEffect(() => {
    window.scrollY = 0;
  }, []);

  if (getSectionsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box margin="30px 0 0">
      <Box as={Row} width="100%" gutter={[10, 0]}>
        <Col span={16}>
          <Box as={Row} width="100%" gutter={[0, 30]}>
            <Col span={24}>
              <VideoPlay />
            </Col>
            <Box as={Col} span={24}>
              <Comments />
            </Box>
          </Box>
        </Col>
        <Col span={8}>
          <VideoPlayList sections={sections ?? []} />
        </Col>
      </Box>
    </Box>
  );
};

export default CourseContainer;
