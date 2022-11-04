import React, { useEffect, useState } from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import StyledSteps from "src/components/Steps/styles";
import useGetCourseById from "src/hooks/apis/Course/useGetCourseById";
import useStep from "src/hooks/useStep";
import CreateSections from "./components/CreateSections";
import InformationForm from "./components/InformationForm";

interface Props {
  mode: "create" | "edit";
  courseId?: string;
}

const { Step } = StyledSteps;

const UploadContainer = ({ mode, courseId }: Props) => {
  const [currentStep, { goToNextStep, goToSpecificStep }] = useStep(2);
  const [id, setCourseId] = useState<string>("");
  const { data: courseData } = useGetCourseById(courseId);

  useEffect(() => {
    if (courseId) {
      setCourseId(courseId);
    }
  }, [courseId]);

  const renderProperForm = () => {
    switch (currentStep) {
      case 1: {
        return (
          <InformationForm
            setCourseId={setCourseId}
            mode={mode}
            goToNextStep={goToNextStep}
            defaultValues={courseData}
          />
        );
      }

      case 2: {
        return <CreateSections courseId={id} />;
      }

      default:
        goToSpecificStep(0);
    }
  };

  return (
    <Box padding="40px" borderRadius="large" bg="white">
      <Text fontSize="xl" lineHeight="xl" fontWeight="medium" color="text">
        Upload
      </Text>
      <Center margin="40px 0 0">
        <Box width="40%" as={StyledSteps} current={currentStep - 1}>
          <Step title="Information" />
          <Step title="Create Sections" />
        </Box>
      </Center>
      <Box width="80%" margin="80px auto">
        {renderProperForm()}
      </Box>
    </Box>
  );
};

export default UploadContainer;
