import React from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import { forgotPasswordSchemas } from "src/utils/schemas/AuthSchema";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";

interface ChangePasswordInputProps {
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm = () => {
  const onSubmit: SubmitHandler<ChangePasswordInputProps> = (data) =>
    console.log(data);

  return (
    <Center width="80%" flexDirection="column">
      <Text fontWeight="medium" fontSize="xl" lineHeight="xl">
        Set New Password
      </Text>
      <Box margin="20px 0 40px">
        <Text
          textAlign="center"
          fontSize="xs"
          fontWeight="regular"
          lineHeight="normal"
        >
          A strong password helps prevent unauthorized access to your email
          account.
        </Text>
      </Box>
      <Form
        width="100%"
        defaultValues={{
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={onSubmit}
        schema={forgotPasswordSchemas.changePasswordSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter your new password here"
              name="newPassword"
              label="New Password"
              type="password"
              control={control}
            />
            <Form.Input
              placeholder="Enter your password again"
              name="confirmNewPassword"
              label="Confirm Password"
              type="password"
              control={control}
            />
            <Box as={Button} width="100%" type="submit">
              Confirm
            </Box>
          </>
        )}
      </Form>
    </Center>
  );
};

export default ChangePasswordForm;
