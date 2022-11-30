import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import Box, { BoxProps } from "../Box";
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

const Input = React.forwardRef(function Input(
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
) {
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

  /* eslint-disable */
  useEffect(() => {
    if (inputValue) {
      handleChange && handleChange(inputValue);
    }
  }, [inputValue]);
  /* eslint-enable */

  /* eslint-disable */
  useEffect(() => {
    // condition value !== "<p><br></p>" used for case user input utf8 characters and react-quill auto translate into <br>
    if (value !== inputValue && value !== "<p><br></p>") {
      setInputValue(value);
    }
  }, [value]);
  /* eslint-enable */

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
        {isRequired && (
          <Box as="span" color="danger">
            {" "}
            *
          </Box>
        )}
      </S.Label>
      <S.InputWrapper disabled={disabled} isError={!!error}>
        {/* put suffix icon here */}
        <Box className={`${suffixPosition === "left" ? "" : "order-1"}`}>
          {suffixIcon}
        </Box>
        {renderElementInput()}
      </S.InputWrapper>
      {error && <ErrorMessage text={error.message ?? ""} />}
    </S.Wrapper>
  );
});

export default Input;
