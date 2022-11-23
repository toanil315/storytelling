import { Col, Row } from "antd";
import { useState } from "react";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import useStep from "src/hooks/useStep";
import { StepOfRetrievePassword } from "src/utils/constants";
import ChangePasswordForm from "./components/ChangePasswordForm";
import SubmitEmailForm from "./components/SubmitEmailForm";
import VerifyEmailForm from "./components/VerifyEmailForm";

const ForgotPasswordContainer = () => {
  const [currentStep, { goToNextStep }] = useStep(3);
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<number>(0);

  const renderProperForm = () => {
    switch (currentStep) {
      case StepOfRetrievePassword.SUBMIT_EMAIL: {
        return (
          <SubmitEmailForm setEmail={setEmail} goToNextStep={goToNextStep} />
        );
      }

      case StepOfRetrievePassword.VERIFY_EMAIL: {
        return (
          <VerifyEmailForm
            setVerifyCode={setVerifyCode}
            email={email}
            goToNextStep={goToNextStep}
          />
        );
      }

      case StepOfRetrievePassword.CHANGE_PASSWORD: {
        return <ChangePasswordForm verifyCode={verifyCode} email={email} />;
      }

      default:
        throw `Step ${currentStep} in Retrieve Password process is invalid`;
    }
  };

  return (
    <Center
      width="100vw"
      height="100vh"
      padding="60px 0"
      margin="0 auto"
      bg="lightGray"
    >
      <Box
        bg="white"
        as={Row}
        width="95%"
        padding="40px"
        maxWidth="1144px"
        borderRadius="10px"
        minHeight="95%"
      >
        <Center as={Col} span={10} offset={7}>
          {renderProperForm()}
        </Center>
      </Box>
    </Center>
  );
};

export default ForgotPasswordContainer;
