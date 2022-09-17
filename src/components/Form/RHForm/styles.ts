import { color } from "src/utils/colors";
import styled from "styled-components";

export interface FormWrapperProps {
  width?: string;
  padding?: string;
  margin?: string;
}

export const FormWrapper = styled.form<FormWrapperProps>`
  width: ${({ width }) => width ?? "100%"};
  padding: ${({ padding }) => padding ?? "0 90px"};
  margin: ${({ margin }) => margin ?? ""};

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 26px;
  line-height: 38px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ChangeForm = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${color.text};
  text-align: center;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: ${color.primary};
  }
`;
