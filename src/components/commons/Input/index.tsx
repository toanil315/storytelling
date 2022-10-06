import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BoxProps } from "../Box";
import ErrorMessage from "../ErrorMessage";
import * as S from "./styles";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../TextEditor"), {
  ssr: false,
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  BoxProps & {
    width?: string;
    suffixIcon?: JSX.Element;
    suffixPosition?: "left" | "right";
    label?: string;
    isRequired?: boolean;
    error?: { message?: string };
    handleChange?: (value: string | number | undefined) => void;
    direction?: "column" | "row";
    as?: "input" | "textarea";
  };

const Input = React.forwardRef(
  (
    {
      width = "100%",
      suffixIcon,
      suffixPosition = "left",
      label,
      isRequired = false,
      disabled = false,
      error,
      handleChange,
      value,
      direction,
      as = "input",
      hidden,
      bg = "transparent",
      ...restProps
    }: InputProps,
    ref
  ) => {
    const { name } = restProps;
    const [inputValue, setInputValue] = useState<string | number | undefined>(
      value
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleEditorChange = (value: string) => {
      setInputValue(value);
    };

    useEffect(() => {
      setInputValue(value);
    }, []);

    useEffect(() => {
      handleChange && handleChange(inputValue);
    }, [inputValue]);

    const renderElementInput = () => {
      switch (as) {
        case "input": {
          return (
            <input
              value={inputValue}
              id={name}
              {...restProps}
              onChange={handleInputChange}
            />
          );
        }

        case "textEditor": {
          return (
            <TextEditor
              value={inputValue}
              id={name}
              {...restProps}
              onChange={handleEditorChange}
            />
          );
        }
      }
    };

    return (
      <S.Wrapper width={width}>
        <S.Label as="label" htmlFor={name}>
          {label}
          {isRequired && <span> *</span>}
        </S.Label>
        <S.InputWrapper disabled={disabled} isError={!!error}>
          {/* put suffix icon here */}
          {renderElementInput()}
        </S.InputWrapper>
        {error && <ErrorMessage text={error.message ?? ""} />}
      </S.Wrapper>
    );
  }
);

export default Input;
