import React from "react";
import parse from "html-react-parser";
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

const course = {
  id: "1",
  name: "Certified Kubernetes Administrator (CKA) with Practice Tests",
  author: {
    id: "1",
    name: "KobeKloud  Training",
  },
  updatedAt: "10/2022",
  description: JSON.stringify(
    `<p><strong>*** Updated for latest CKA (2022) 1.24 version of Exam ***</strong></p><p><br></p><p>Kubernetes is one of the highest trending technology in Cloud Computing as of today. Kubernetes had the fastest growth in job searches, over 173% from a year before as reported recently by a survey conducted by Indeed.</p><p>Learn, practice, and get certified on Kubernetes with&nbsp;<strong>hands-on labs right in your browser</strong>.</p><p><em>"I have compared this to other courses at Udemy and Linux Academy. All have the strengths and gaps, so far this is a winner!"</em>&nbsp;-&nbsp;Thomas Trauss, Student</p><p>Learning&nbsp;<strong>Kubernetes</strong>&nbsp;is essential for any DevOps professional. DevOps engineers are always in demand. Currently, the average Silicon Valley salary for a DevOps engineer is 20% higher than what a software engineer makes.&nbsp;<strong>DevOps engineers make an average of $140,000 to $200,000 annually.&nbsp;</strong>And One of the most in-demand skills is&nbsp;<strong>Kubernetes Administration.</strong></p><p>Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation.</p>`
  ),
  category: {
    id: "1",
    name: "development",
  },
  rating: 4.7,
  students: 203.47,
};

const CourseDetailContainer = () => {
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
            <Text color="white">{course.category.name}</Text>
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
                {course.rating}
              </Text>
              <Box margin="0 0 0 5px" as="ul" display="flex">
                {new Array(Number(String(course.rating).split(".")[0]))
                  .fill(1)
                  .map((star, index) => (
                    <StarIcon key={index} width={15} height={15} />
                  ))}
                {Number(String(course.rating).split(".")[1]) >= 5 ? (
                  <HalfStarIcon width={15} height={15} />
                ) : null}
              </Box>
            </Box>
            <Box as={Text} padding="0 0 0 10px">
              ({formatNumber(course.students)} students)
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
              href={`${Path.user}/${course.author.id}`}
              fontWeight="bold"
              color="green"
            >
              <Text
                style={{ cursor: "pointer" }}
                as="span"
                fontWeight="bold"
                color="green"
              >
                {course.author.name}
              </Text>
            </Box>
          </Box>
          <Box margin="25px 0" width="100%" height="250px">
            <ImageComponent
              src="/assets/thumbnail-example.png"
              alt="thumbnail"
            />
          </Box>
          <Box margin="15px 0">
            <Text fontSize="xl" lineHeight="xl" fontWeight="bold" color="text">
              Description:
            </Text>
            <Box>{parse(JSON.parse(course.description))}</Box>
          </Box>
          <Box margin="25px 0">
            <Text fontSize="xl" lineHeight="xl" fontWeight="bold" color="text">
              Course Content:
            </Text>
            <Box margin="10px 0 0">
              <CourseContents />
            </Box>
          </Box>
        </Box>
      </Col>
      <Col span={7}>
        <Box bg="white" borderRadius="large" padding="15px">
          <Box width="100%" height="200px" style={{ position: "relative" }}>
            <ImageComponent
              src="/assets/thumbnail-example.png"
              alt="thumbnail"
            />
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
            19.99$
          </Box>
          <Box as={Button} width="100%" margin="15px 0">
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
              <Text>3 sections</Text>
            </Box>
          </Box>
        </Box>
      </Col>
    </Box>
  );
};

export default CourseDetailContainer;
