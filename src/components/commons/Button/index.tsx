import React, { ButtonHTMLAttributes } from "react";
import { ButtonWhite } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  $type: "primary" | "secondary" | "white" | "disabled";
}

const Button = ({ $type, children, ...rest }: Props) => {
  switch ($type) {
    case "white":
      return <ButtonWhite {...rest}>{children}</ButtonWhite>;

    default:
      throw(`Unknow type ${$type} of button`);
  }
};

export default Button;
