import type { ReactNode } from "react";
import { memo } from "react";
import * as S from "./styles";

interface ButtonProps {
  $type?: "primary" | "secondary" | "white";
  children: ReactNode;
  loading?: boolean;
}

const Button = ({
  $type = "primary",
  children,
  loading,
  ...rest
}: ButtonProps) => {
  switch ($type) {
    case "primary":
      return (
        <S.PrimaryButton loading={loading} {...rest}>
          {loading && <S.Loading />}
          {children}
        </S.PrimaryButton>
      );

    case "secondary":
      return (
        <S.SecondaryButton loading={loading} {...rest}>
          {loading && <S.LoadingSecondary />}
          {children}
        </S.SecondaryButton>
      );

    case "white":
      return <S.WhiteButton {...rest}>{children}</S.WhiteButton>;

    default:
      throw new Error("Invalid type button!");
  }
};

export default memo(Button);
