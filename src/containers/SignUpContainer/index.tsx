import React, { useMemo } from "react";
import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { signUpSchema } from "src/utils/schemas/AuthSchema";
import Box from "src/components/commons/Box";
import { Col, Row } from "antd";
import Text from "src/components/commons/Typography";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSignUp from "src/hooks/apis/Auth/useSignUp";
import { UserRegister } from "src/data-model/UserTypes";
import { toast } from "react-toastify";

interface SignUpInputProps extends UserRegister {
  confirmPassword?: string;
}

const SignUpContainer = () => {
  const { t } = useTranslation();
  const { register, isLoading, isError, isSuccess } = useSignUp();
  const onSubmit: SubmitHandler<SignUpInputProps> = async (data) => {
    delete data.confirmPassword;
    try {
      await register(data);
      toast.success(t("toast.success.register"));
    } catch (error) {
      toast.error(t("toast.error.register"));
    }
  };

  const fieldsSignUp = useMemo(
    () => [
      {
        key: "Full Name",
        component: (
          <Form.Input
            placeholder={t("placeholder.register.fullName")}
            name="fullName"
            label={t("label.register.fullName")}
          />
        ),
      },
      {
        key: "Email",
        component: (
          <Form.Input
            placeholder={t("placeholder.register.email")}
            name="email"
            label={t("label.register.email")}
          />
        ),
      },
      {
        key: "Password",
        component: (
          <Form.Input
            placeholder={t("placeholder.register.password")}
            name="password"
            label={t("label.register.password")}
            type="password"
          />
        ),
      },
      {
        key: "Confirm Password",
        component: (
          <Form.Input
            placeholder={t("placeholder.register.confirmPassword")}
            name="confirmPassword"
            label={t("label.register.confirmPassword")}
            type="password"
          />
        ),
      },
    ],
    [t]
  );

  const renderRegisterForm = (control: Control<SignUpInputProps>) =>
    fieldsSignUp.map((field) =>
      React.cloneElement(field.component, {
        control,
        key: field.key,
      })
    );

  return (
    <Center
      width="100vw"
      height="100vh"
      bg="lightGray"
      overflow="hidden"
      padding="20px"
    >
      <Box
        bg="white"
        as={Row}
        width="90%"
        maxWidth="1144px"
        padding="30px 40px"
        borderRadius="10px"
      >
        <Col span={12}>
          <ImageComponent src="/assets/Welcome.png" alt="auth banner" />
        </Col>
        <Col span={12}>
          <Form
            width="80%"
            margin="0 auto"
            defaultValues={{
              fullName: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            schema={signUpSchema}
          >
            {({ control }) => (
              <>
                <Form.Title>Sign Up</Form.Title>
                {renderRegisterForm(control)}
                <Button loading={isLoading} type="submit">
                  Sign Up
                </Button>
                <Link href={`${Path.login}`}>
                  <Center style={{ cursor: "pointer" }}>
                    <Text
                      as="span"
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight="normal"
                      color="text"
                    >
                      You already have an account?
                      <Box as="span" color="green" padding="0 4px">
                        Login
                      </Box>
                    </Text>
                  </Center>
                </Link>
              </>
            )}
          </Form>
        </Col>
      </Box>
    </Center>
  );
};

export default SignUpContainer;
