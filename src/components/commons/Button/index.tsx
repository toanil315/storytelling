import type { ComponentType, ReactNode } from "react";
import { memo } from "react";
import { BoxProps } from "../Box";
import * as S from "./styles";

interface ButtonProps extends BoxProps {
  $type?: "primary" | "secondary" | "white";
  as?: string | ComponentType<any>;
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
          {...rest}
          borderRadius={borderRadius}
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
          {...rest}
          borderRadius={borderRadius}
        >
          {loading && <S.LoadingSecondary />}
          {children}
        </S.SecondaryButton>
      );

    case "white":
      return (
        <S.WhiteButton as={as} {...rest} borderRadius={borderRadius}>
          {children}
        </S.WhiteButton>
      );

    default:
      throw new Error("Invalid type button!");
  }
};

export default memo(Button);
