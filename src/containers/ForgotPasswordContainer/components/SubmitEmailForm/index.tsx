import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { forgotPasswordSchemas } from "src/utils/schemas/AuthSchema";
import Box from "src/components/commons/Box";
import { Col, Row } from "antd";
import Text from "src/components/commons/Typography";
import Center from "src/components/commons/Center";
import SendToEmailIcon from "src/components/icons/SendToEmailIcon";
import { HelpersUseStep } from "src/hooks/useStep";
import { Dispatch, SetStateAction } from "react";

interface SubmitEmailInputProps {
  email: string;
}

interface Props extends Partial<HelpersUseStep> {
  setEmail: Dispatch<SetStateAction<string>>;
}

const SubmitEmailForm = ({ setEmail, goToNextStep }: Props) => {
  const onSubmit: SubmitHandler<SubmitEmailInputProps> = (data) => {
    console.log(data);
    setEmail(data.email);
    goToNextStep && goToNextStep();
  };

  return (
    <Center flexDirection="column">
      <Text fontWeight="medium" fontSize="xl" lineHeight="xl">
        Forgot your password
      </Text>
      <Text
        textAlign="center"
        fontSize="xs"
        fontWeight="regular"
        lineHeight="normal"
      >
        Enter your registered email below to receive password reset instruction
      </Text>
      <Box margin="40px 0">
        <SendToEmailIcon />
      </Box>
      <Form
        width="100%"
        defaultValues={{
          email: "",
        }}
        onSubmit={onSubmit}
        schema={forgotPasswordSchemas.submitEmailSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter your email here"
              name="email"
              label="Email"
              control={control}
            />
            <Box width="100%">
              <Box as={Button} width="100%" type="submit">
                Send
              </Box>
              <Link href={`${Path.login}`}>
                <Center margin="12px 0px 0px" style={{ cursor: "pointer" }}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    lineHeight="normal"
                    color="text"
                  >
                    Remember password?
                    <Box as="span" color="green" padding="0 4px">
                      Sign In
                    </Box>
                  </Text>
                </Center>
              </Link>
            </Box>
          </>
        )}
      </Form>
    </Center>
  );
};

export default SubmitEmailForm;
