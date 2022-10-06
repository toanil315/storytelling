import React from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import StyledSteps from "src/components/Steps/styles";
import useStep from "src/hooks/useStep";
import InformationForm from "./components/InformationForm";

const { Step } = StyledSteps;

const UploadContainer = () => {
  const [currentStep, { goToNextStep, goToPrevStep }] = useStep(2);

  const renderProperForm = () => {
    switch (currentStep) {
      case 1: {
        return <InformationForm />;
      }

      default:
        throw Error(`Step ${currentStep} is invalid in create course progress`);
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