import { color } from "src/utils/colors";
import styled from "styled-components";

export const VideoCardWrapper = styled.div`
  background-color: ${color.white};
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;

  & .name {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: ${color.text};
  }

  & .time-stamp {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: ${color.textLight};
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 142px;
  border-radius: 6px;
  cursor: pointer;

  & > .duration {
    position: absolute;
    bottom: 8px;
    right: 8px;

    padding: 1px 5px;
    border-radius: 2px;
    background-color: ${color.text};

    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: ${color.white};
  }

  & > .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${color.primary};

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;
    visibility: hidden;

    transition: all 0.2s ease-out;
  }

  &:hover {
    .play-btn {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const CategoryName = styled.h4`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${color.green};
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: ${color.text};
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${color.textLight};
`;

export const VideoFigures = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${color.textSemibold};

  & > span {
    padding: 0 8px;
  }
`;
