import Image from "next/image";
import React from "react";
import {
  Author,
  CategoryName,
  Content,
  Description,
  Thumbnail,
  Title,
  VideoCardWrapper,
  VideoFigures,
} from "./styles";
import PlayIcon from "src/components/icons/PlayIcon";

const VideoCard = () => {
  return (
    <VideoCardWrapper>
      <Content>
        <Author>
          <div className="author-image relative w-12 h-12 rounded-full mr-4">
            <Image
              layout={"fill"}
              src="/assets/author-image-example.png"
              objectFit="cover"
            />
          </div>
          <div>
            <p className="name">Ahmad Deedat</p>
            <span className="time-stamp">3h ago</span>
          </div>
        </Author>
        <Thumbnail>
          <Image
            className="rounded-md"
            layout={"fill"}
            src="/assets/thumbnail-example.png"
            objectFit="cover"
          />
          <button className="play-btn">
            <PlayIcon />
          </button>
          <span className="duration">4:36</span>
        </Thumbnail>
        <CategoryName>Motivation</CategoryName>
        <Title>Salat Definition & Meaning</Title>
        <Description>
          Salat definition, prayers, said five times a day: the second...
        </Description>
        <VideoFigures>
          428,304 views
          <span>•</span>
          49,206 likes
        </VideoFigures>
      </Content>
    </VideoCardWrapper>
  );
};

export default VideoCard;
