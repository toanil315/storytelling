import Image from "next/image";
import React from "react";
import {
  AuthenticateContainer,
  ChangeForm,
  FormWrapper,
  ImageContainer,
  Title,
} from "./styles";
import * as Form from "src/components/Form";
import { useForm } from "react-hook-form";
import Button from "src/components/commons/Button";
import Link from "next/link";

interface LoginInputProps {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const { control } = useForm<LoginInputProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      <FormWrapper>
        <Title>Sign Up for an Account</Title>
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
        <Button>Login</Button>
        <Link href={"/signup"}>
          <ChangeForm>You haven't any account? Sign Up</ChangeForm>
        </Link>
      </FormWrapper>
    </AuthenticateContainer>
  );
};

export default LoginContainer;
