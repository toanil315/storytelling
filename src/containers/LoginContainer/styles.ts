import { color } from "src/utils/colors";
import styled from "styled-components";

export const AuthenticateContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  padding: 60px 0;
  max-width: 1144px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 26px;
  line-height: 38px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
`;

export const FormWrapper = styled.form`
  width: 50%;
  padding: 0 90px;

  display: flex;
  flex-direction: column;
  gap: 20px;
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
