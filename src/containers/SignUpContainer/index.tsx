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

interface SignUpInputProps {
  email: string;
  password: string;
}

const SignUpContainer = () => {
  const onSubmit: SubmitHandler<SignUpInputProps> = (data) => console.log(data);

  const fieldsSignUp = useMemo(
    () => [
      {
        key: "First Name",
        component: (
          <Form.Input
            placeholder="Enter your first name here"
            name="firstName"
            label="Email"
          />
        ),
      },
      {
        key: "Last Name",
        component: (
          <Form.Input
            placeholder="Enter your last name here"
            name="lastName"
            label="Last Name"
          />
        ),
      },
      {
        key: "Email",
        component: (
          <Form.Input
            placeholder="Enter your email here"
            name="email"
            label="Email"
          />
        ),
      },
      {
        key: "Password",
        component: (
          <Form.Input
            placeholder="Enter your password here"
            name="password"
            label="Password"
            type="password"
          />
        ),
      },
      {
        key: "Confirm Password",
        component: (
          <Form.Input
            placeholder="Enter your password again"
            name="confirmPassword"
            label="Password Confirmation"
            type="password"
          />
        ),
      },
    ],
    []
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
          <ImageComponent src="/assets/Welcome.png" />
        </Col>
        <Col span={12}>
          <Form
            width="80%"
            margin="0 auto"
            defaultValues={{
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
                <Button type="submit">Sign Up</Button>
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
