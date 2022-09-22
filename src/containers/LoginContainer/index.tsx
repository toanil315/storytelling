import Image from "next/image";
import React from "react";
import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { loginSchema } from "src/utils/schemas/AuthSchema";
import Box from "src/components/commons/Box";
import { Col, Row } from "antd";

interface LoginInputProps {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const onSubmit: SubmitHandler<LoginInputProps> = (data) => console.log(data);

  return (
    <Box
      width="100vw"
      height="100vh"
      padding="60px 0"
      maxWidth="1144px"
      margin="0 auto"
    >
      <Box as={Row} width="100%" height="100%">
        <Col span={12}>
          <Box className="relative" width="100%" height="100%">
            <Image
              className="w-full h-full"
              src="/assets/Welcome.png"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Col>
        <Col span={12}>
          <Form
            width="80%"
            margin="50px auto"
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
                <Button type="submit">Login</Button>
                <Link href={`${Path.signUp}`}>
                  <Form.ChangeForm>
                    You haven't any account? Sign Up
                  </Form.ChangeForm>
                </Link>
              </>
            )}
          </Form>
        </Col>
      </Box>
    </Box>
  );
};

export default LoginContainer;
