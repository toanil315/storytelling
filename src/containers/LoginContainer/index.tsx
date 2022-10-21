import React from "react";
import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { loginSchema } from "src/utils/schemas/AuthSchema";
import Box from "src/components/commons/Box";
import { Col, Row } from "antd";
import Text from "src/components/commons/Typography";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";

interface LoginInputProps {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const onSubmit: SubmitHandler<LoginInputProps> = (data) => console.log(data);

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
        <Col span={12}>
          <ImageComponent src="/assets/Welcome.png" alt="banner image" />
        </Col>
        <Col span={12}>
          <Center width="100%" height="100%">
            <Form
              width="80%"
              defaultValues={{
                email: "",
                password: "",
              }}
              onSubmit={onSubmit}
              schema={loginSchema}
            >
              {({ control }) => (
                <>
                  <Form.Title>Login</Form.Title>
                  <Form.Input
                    placeholder="Enter your email here"
                    name="email"
                    label="Email"
                    control={control}
                  />
                  <Form.Input
                    placeholder="Enter your password here"
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                  />
                  <Box width="100%">
                    <Link href={`${Path.forgotPassword}`}>
                      <Text
                        style={{ cursor: "pointer" }}
                        fontSize="sm"
                        fontWeight="medium"
                        lineHeight="normal"
                        color="green"
                        textAlign="right"
                      >
                        Forgot Password?
                      </Text>
                    </Link>
                    <Box as={Button} width="100%" type="submit" margin="13px 0">
                      Login
                    </Box>
                    <Link href={`${Path.signUp}`}>
                      <Center style={{ cursor: "pointer" }}>
                        <Text
                          as="span"
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="text"
                        >
                          You haven&apos;t any account?
                          <Box as="span" color="green" padding="0 4px">
                            Sign Up
                          </Box>
                        </Text>
                      </Center>
                    </Link>
                  </Box>
                </>
              )}
            </Form>
          </Center>
        </Col>
      </Box>
    </Center>
  );
};

export default LoginContainer;
