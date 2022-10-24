import type { ComponentType, ReactNode } from "react";
import { memo } from "react";
import Box, { BoxProps } from "../Box";
import * as S from "./styles";

interface ButtonProps extends BoxProps {
  $type?: "primary" | "secondary" | "white";
  children: ReactNode;
  loading?: boolean;
}

const Button = ({
  $type = "primary",
  children,
  loading,
  borderRadius = "6px",
  as = "button",
  ...rest
}: ButtonProps) => {
  switch ($type) {
    case "primary":
      return (
        <S.PrimaryButton
          as={as}
          loading={loading}
          borderRadius={borderRadius}
          {...rest}
        >
          {loading && <S.Loading />}
          {children}
        </S.PrimaryButton>
      );

    case "secondary":
      return (
        <S.SecondaryButton
          as={as}
          loading={loading}
          borderRadius={borderRadius}
          {...rest}
        >
          {loading && <S.LoadingSecondary />}
          {children}
        </S.SecondaryButton>
      );

    case "white":
      return (
        <S.WhiteButton as={as} borderRadius={borderRadius} {...rest}>
          {children}
        </S.WhiteButton>
      );

    default:
      throw new Error("Invalid type button!");
  }
};

export default memo(Button);
