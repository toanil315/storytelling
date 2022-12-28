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
import Text from "src/components/commons/Typography";
import { LectureType } from "src/data-model/CourseTypes";
import {
  useCheckFinishedCourse,
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
import CertificateModal from "./components/CertificateModal";
import TrophyIcon from "src/components/icons/TrophyIcon";
import { useModal } from "src/hooks";
import { StyledCircleProgress } from "./styles";

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
  const certificateModal = useModal();
  const { isFinishCourse } = useCheckFinishedCourse(
    currentUserLogin?.userId ?? "",
    courseId
  );

  console.log(courseId);
  console.log("========================sections: ", sections);

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
      <Box
        className="flex items-center justify-between"
        width="100%"
        padding="15px"
        margin="30px 0"
        bg="white"
        borderRadius="large"
      >
        <Text fontSize="lg" fontWeight="bold" lineHeight="xl" color="text">
          {course?.name}
        </Text>
        <Box className="flex items-center gap-x-6">
          {isFinishCourse ? (
            <Box onClick={() => certificateModal.toggleModal()}>
              <StyledCircleProgress>
                <TrophyIcon color="#ebeb10" />
              </StyledCircleProgress>
            </Box>
          ) : (
            <Box>
              <StyledCircleProgress>
                <TrophyIcon color="#979393" />
              </StyledCircleProgress>
            </Box>
          )}
        </Box>
      </Box>
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
      <CertificateModal course={course} modal={certificateModal} />
    </div>
  );
};

export default CourseContainer;
