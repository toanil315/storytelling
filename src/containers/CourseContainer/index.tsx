import { Col, Row } from "antd";
import { useRouter } from "next/router";
import path from "path";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import PlaceholderLoading from "src/components/commons/Loading";
import { LectureType } from "src/data-model/CourseTypes";
import {
  useGetCourseById,
  useGetLecturesBySection,
  useGetSection,
  useUser,
} from "src/hooks/apis";
import { userServices } from "src/services/UserServices";
import { Path } from "src/utils/Path";
import Comments from "./components/Comments";
import VideoPlay from "./components/VideoPlay";
import VideoPlayList from "./components/VideoPlayList";

interface Props {
  courseId: string;
}

const CourseContainer = ({ courseId }: Props) => {
  const router = useRouter();
  const [isCheckPurchased, setIsCheckPurchased] = useState<boolean>(false);
  const { data: sections, isLoading: getSectionsLoading } =
    useGetSection(courseId);
  const { data: lectures, isLoading: getLecturesLoading } =
    useGetLecturesBySection(sections?.[0]?.id ?? "");
  const { user: currentUserLogin } = useUser();
  const { data: course } = useGetCourseById(courseId ?? "");

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

  useLayoutEffect(() => {
    const handleCheckIsPurchasedCourse = async (
      userId: string,
      courseId: string
    ) => {
      const result = await userServices.checkPurchasedCourse(userId, courseId);
      if (!Boolean(result.data)) {
        router.push(`/${Path.error}`);
      }
    };

    if (
      currentUserLogin &&
      course &&
      currentUserLogin.userId !== course?.userId
    ) {
      handleCheckIsPurchasedCourse(currentUserLogin.userId, courseId);
    }
    setIsCheckPurchased(true);
  }, [currentUserLogin, course]);

  if (getSectionsLoading || !isCheckPurchased) {
    return (
      <Center width="100%" height="50vh">
        <PlaceholderLoading />
      </Center>
    );
  }

  return (
    <div style={{ margin: "30px 0 0", height: "100%" }}>
      <Box as={Row} width="100%" gutter={[10, 0]}>
        <Col span={16}>
          <Box as={Row} width="100%" gutter={[0, 30]}>
            <Col span={24}>
              <VideoPlay />
            </Col>
            <Box as={Col} span={24}>
              <Comments videoId={router.query.lectureId as string} />
            </Box>
          </Box>
        </Col>
        <Col span={8}>
          <VideoPlayList sections={sections ?? []} />
        </Col>
      </Box>
    </div>
  );
};

export default CourseContainer;
