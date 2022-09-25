import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import ErrorMessage from "../ErrorMessage";
import * as S from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  suffixIcon?: JSX.Element;
  label?: string;
  isRequired?: boolean;
  error?: { message?: string };
  handleChange?: (value: string | number | undefined) => void;
};

const Input = React.forwardRef(
  (
    {
      width = "100%",
      suffixIcon,
      label,
      isRequired = false,
      disabled = false,
      error,
      handleChange,
      value,
      ...restProps
    }: InputProps,
    ref
  ) => {
    const { name } = restProps;
    const [inputValue, setInputValue] = useState<string | number | undefined>(
      ""
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    useEffect(() => {
      handleChange && handleChange(inputValue);
    }, [inputValue]);

    return (
      <S.Wrapper width={width}>
        <S.Label as="label" htmlFor={name}>
          {label}
          {isRequired && <span> *</span>}
        </S.Label>
        <S.InputWrapper disabled={disabled} isError={!!error}>
          {/* put suffix icon here */}
          <input
            value={inputValue}
            id={name}
            {...restProps}
            onChange={handleInputChange}
          />
        </S.InputWrapper>
        {error && <ErrorMessage text={error.message ?? ""} />}
      </S.Wrapper>
    );
  }
);

export default Input;
