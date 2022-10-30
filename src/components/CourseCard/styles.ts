import styled from "styled-components";

export const VideoCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;

  & .name {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.text};
  }

  & .time-stamp {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.textLight};
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
    background-color: ${({ theme }) => theme.colors.text};

    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.white};
  }

  & > .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};

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
  color: ${({ theme }) => theme.colors.green};
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const VideoFigures = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textSemibold};

  & > span {
    padding: 0 8px;
  }
`;
