import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Form from "src/components/Form";
import { useChangePassword } from "src/hooks/apis";
import { changePasswordSchema } from "src/utils/schemas/UserInformationSchema";

interface ChangePasswordInputProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

const ChangePasswordForm = () => {
  const { changePassword, isLoading, isError } = useChangePassword();
  const onSubmit: SubmitHandler<ChangePasswordInputProps> = (data) => {
    delete data.confirmNewPassword;
    changePassword(data);
  };

  return (
    <Box width="100%">
      <Form
        width="80%"
        margin="0 auto"
        defaultValues={{
          oldPassword: "",
          newPassword: "",
        }}
        onSubmit={onSubmit}
        schema={changePasswordSchema}
        enableResetForm={true}
      >
        {({ control }) => (
          <>
            <Box as={Row} width="100%" gutter={[20, 30]}>
              <Col span={24}>
                <Form.Input
                  placeholder="Enter your old password here"
                  name="oldPassword"
                  label="Old Password"
                  isRequired
                  type="password"
                  control={control}
                />
              </Col>
              <Col span={24}>
                <Form.Input
                  placeholder="Enter your new password here"
                  name="newPassword"
                  label="New Password"
                  isRequired
                  type="password"
                  control={control}
                />
              </Col>
              <Col span={24}>
                <Form.Input
                  placeholder="Enter your new password again"
                  name="confirmNewPassword"
                  label="Password Confirmation"
                  isRequired
                  type="password"
                  control={control}
                />
              </Col>

              <Box
                loading={isLoading}
                as={Button}
                width="50%"
                height="50px"
                type="submit"
                margin="20px auto"
              >
                Change
              </Box>
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default ChangePasswordForm;
