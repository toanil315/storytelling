import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { forgotPasswordSchemas } from "src/utils/schemas/AuthSchema";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import Center from "src/components/commons/Center";
import VerifyEmailIcon from "src/components/icons/VerifyEmailIcon";
import { HelpersUseStep } from "src/hooks/useStep";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useVerifyCodeForgotPassword } from "src/hooks/apis";

interface VerifyEmailInputProps {
  verifyCode: string;
}

interface Props extends Partial<HelpersUseStep> {
  email: string;
  setVerifyCode: Dispatch<SetStateAction<number>>;
}

const VerifyEmailForm = ({ email, setVerifyCode, goToNextStep }: Props) => {
  const { verifyCode, isLoading, isSuccess } = useVerifyCodeForgotPassword();
  const onSubmit: SubmitHandler<VerifyEmailInputProps> = (data) => {
    verifyCode({
      email,
      verifyCode: Number(data.verifyCode),
    });
    setVerifyCode(Number(data.verifyCode));
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      goToNextStep && goToNextStep();
    }
  }, [isLoading, isSuccess]);

  return (
    <Center flexDirection="column">
      <Text fontWeight="medium" fontSize="xl" lineHeight="xl">
        Verify your email
      </Text>
      <Text
        textAlign="center"
        fontSize="xs"
        fontWeight="regular"
        lineHeight="normal"
      >
        Please enter rhe 4 digit cods sent to {email}
      </Text>
      <Box margin="40px 0">
        <VerifyEmailIcon />
      </Box>
      <Form
        width="100%"
        defaultValues={{
          verifyCode: "",
        }}
        onSubmit={onSubmit}
        schema={forgotPasswordSchemas.verifyEmailSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter your verify code here"
              name="verifyCode"
              label="Verify Code"
              control={control}
            />
            <Box width="100%">
              <Box as={Button} width="100%" type="submit">
                Submit
              </Box>
              <Center margin="12px 0px 0px" style={{ cursor: "pointer" }}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  lineHeight="normal"
                  color="text"
                >
                  Didn’t receive the code?
                  <Box as="span" color="green" padding="0 4px">
                    Resend
                  </Box>
                </Text>
              </Center>
            </Box>
          </>
        )}
      </Form>
    </Center>
  );
};

export default VerifyEmailForm;
