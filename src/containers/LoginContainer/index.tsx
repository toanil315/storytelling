import Image from "next/image";
import React from "react";
import { AuthenticateContainer, ImageContainer } from "./styles";
import Form from "src/components/Form";
import { SubmitHandler } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { loginSchema } from "src/utils/schemas/AuthSchema";

interface LoginInputProps {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const onSubmit: SubmitHandler<LoginInputProps> = (data) => console.log(data);

  return (
    <AuthenticateContainer>
      <ImageContainer>
        <Image
          className="w-full h-full"
          src="/assets/Welcome.png"
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <Form
        width="50%"
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        schema={loginSchema}
      >
        {({ control }) => (
          <>
            <Form.Title>Sign Up for an Account</Form.Title>
            <Form.Input
              width="100%"
              placeholder="Enter your email here"
              name="email"
              label="Email"
              control={control}
            />
            <Form.Input
              width="100%"
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
    </AuthenticateContainer>
  );
};

export default LoginContainer;
