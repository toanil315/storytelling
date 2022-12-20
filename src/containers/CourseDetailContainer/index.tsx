import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "src/components/commons/Box";
import { Col, Row } from "antd";
import Text from "src/components/commons/Typography";
import Link from "next/link";
import { Path } from "src/utils/Path";
import StarIcon from "src/components/icons/StarIcon";
import HalfStarIcon from "src/components/icons/HalfStarIcon";
import formatNumber from "src/utils/helpers/formatNumber";
import ImageComponent from "src/components/commons/Image";
import CourseContents from "./components/CourseContents/CourseContents";
import Button from "src/components/commons/Button";
import PlayIcon from "src/components/icons/PlayIcon";
import PaperIcon from "src/components/icons/PaperIcon";
import Center from "src/components/commons/Center";
import { CourseType } from "src/data-model/CourseTypes";
import useGetCategory from "src/hooks/apis/Course/useGetCategory";
import HTMLReactParser from "html-react-parser";
import { Description } from "./styles";
import {
  useBuyCourse,
  useGetSection,
  useGetUserById,
  useUser,
} from "src/hooks/apis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PAYMENT_STATUS } from "src/utils/constants";
import { userServices } from "src/services/UserServices";

interface Props {
  course: CourseType;
}

const CourseDetailContainer = ({ course }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useGetCategory();
  const { data: sections } = useGetSection(course.id ?? "");
  const { user: currentUserLogin } = useUser();
  const [description, setDescription] = useState<
    string | JSX.Element | JSX.Element[]
  >("");
  const { user } = useGetUserById(course.userId);
  const { buyCourse, isLoading: buyCourseLoading } = useBuyCourse();
  const handleBuyCourse = () => {
    if (!currentUserLogin) {
      toast.error(t("toast.error.cantBuyCourseWithoutLogin"));
      return;
    }
    buyCourse({
      courseId: course.id,
      userId: currentUserLogin.userId,
      language: "vi",
      orderInfo: "tt",
      ipAddress: "127.0.0.1",
    });
  };

  useEffect(() => {
    setDescription(HTMLReactParser(JSON.parse(course.description)));
  }, [setDescription, course.description]);

  useEffect(() => {
    window.scrollY = 0;
  }, []);

  useLayoutEffect(() => {
    const checkIsPurchased = async (userId: string, courseId: string) => {
      const resultCheckIsPurchasedCourse =
        await userServices.checkPurchasedCourse(userId, courseId);
      if (resultCheckIsPurchasedCourse.data) {
        router.push(Path.home);
      }
    };

    if (currentUserLogin) {
      checkIsPurchased(currentUserLogin.userId, course.id);
    }
  }, [currentUserLogin, course]);

  useEffect(() => {
    const paymentStatus = router.query.vnp_TransactionStatus ?? "";
    if (paymentStatus) {
      if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
        toast.success(t("toast.success.buyCourse"));
        router.push(`${Path.courses}/learn/${course.id}`);
      } else {
        toast.error(t("toast.error.buyCourse"));
        router.replace(`${Path.courses}/${course.id}`);
      }
    }
  }, [router.query]);

  return (
    <Box as={Row} width="100%" gutter={[10, 0]}>
      <Col span={17}>
        <Box bg="white" borderRadius="large" padding="15px">
          <Box
            width="max-content"
            padding="5px 15px"
            borderRadius="large"
            bg="green"
            margin="5px 0 15px"
          >
            <Text color="white">
              {data?.find((item) => item.id === course.categoryTopicId)?.name}
            </Text>
          </Box>
          <Box
            as={Text}
            padding="5px 0"
            fontSize="xl"
            lineHeight="xl"
            fontWeight="bold"
            color="text"
          >
            {course.name}
          </Box>
          <Box display="flex" alignItems="baseline">
            <Box display="flex" alignItems="center">
              <Text fontSize="base" fontWeight="bold" color="primary">
                {4.7}
              </Text>
              <Box margin="0 0 0 5px" as="ul" display="flex">
                {new Array(Number(String(4.7).split(".")[0]))
                  .fill(1)
                  .map((star, index) => (
                    <StarIcon key={index} width={15} height={15} />
                  ))}
                {Number(String(4.7).split(".")[1]) >= 5 ? (
                  <HalfStarIcon width={15} height={15} />
                ) : null}
              </Box>
            </Box>
            <Box as={Text} padding="0 0 0 10px">
              ({formatNumber(22037)} students)
            </Box>
          </Box>
          <Box
            padding="5px 0"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="large"
            color="text"
          >
            Created By{" "}
            <Box
              as={Link}
              href={`${Path.profile}/${course.userId}`}
              fontWeight="bold"
              color="green"
            >
              <Text
                style={{ cursor: "pointer" }}
                as="span"
                fontWeight="bold"
                color="green"
              >
                {user?.fullName}
              </Text>
            </Box>
          </Box>
          <Box margin="25px 0" width="100%" height="250px">
            <ImageComponent src={course.thumbnailUrl} alt="thumbnail" />
          </Box>
          <Box margin="15px 0">
            <Text fontSize="xl" lineHeight="xl" fontWeight="bold" color="text">
              Description:
            </Text>
            <Description>
              {HTMLReactParser(JSON.parse(course.description))}
            </Description>
          </Box>
          <Box margin="25px 0">
            <Text fontSize="xl" lineHeight="xl" fontWeight="bold" color="text">
              Course Content:
            </Text>
            <Box margin="10px 0 0">
              <CourseContents courseId={course.id} />
            </Box>
          </Box>
        </Box>
      </Col>
      <Col span={7}>
        <Box bg="white" borderRadius="large" padding="15px">
          <Box width="100%" height="200px" style={{ position: "relative" }}>
            <ImageComponent src={course.thumbnailUrl} alt="thumbnail" />
            <Center
              style={{ position: "absolute", top: 0, left: 0 }}
              width="100%"
              height="100%"
              bg="rgba(0,0,0, 0.2)"
              borderRadius="large"
            >
              <Center
                width="40px"
                height="40px"
                bg="primary"
                borderRadius="rounded"
              >
                <PlayIcon />
              </Center>
            </Center>
          </Box>
          <Box
            fontSize="xl"
            fontWeight="bold"
            color="text"
            lineHeight="xl"
            textAlign="center"
            as={Text}
            padding="10px 0"
          >
            {formatNumber(course.price)} Vnd
          </Box>
          <Box
            onClick={handleBuyCourse}
            as={Button}
            width="100%"
            margin="15px 0"
            loading={buyCourseLoading}
          >
            Enroll Now
          </Box>
          <Box as="ul">
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="text"
              lineHeight="large"
              margin="0 0 10px"
            >
              This course includes:
            </Text>
            <Box as="li" display="flex" padding="8px 0">
              <Box width="30px">
                <PlayIcon />
              </Box>
              <Text>11 hours on-demand video</Text>
            </Box>
            <Box as="li" display="flex" margin="8px 0">
              <Box width="30px">
                <PaperIcon />
              </Box>
              <Text>{sections?.length} sections</Text>
            </Box>
          </Box>
        </Box>
      </Col>
    </Box>
  );
};

export default CourseDetailContainer;
