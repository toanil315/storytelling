import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { Path } from "src/utils/Path";
import { CourseType } from "src/data-model/CourseTypes";
import useGetCategory from "src/hooks/apis/Course/useGetCategory";
import Box from "../commons/Box";

interface Props {
  course: CourseType;
}

const CourseCard = ({ course }: Props) => {
  const { data } = useGetCategory();

  return (
    <VideoCardWrapper>
      <Content>
        <Author>
          <div className="author-image relative w-12 h-12 rounded-full mr-4">
            <Image
              layout={"fill"}
              src={"/assets/author-image-example.png"}
              objectFit="cover"
              alt="author avatar"
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
            src={course.thumbnailUrl}
            objectFit="cover"
            alt="thumbnail image"
          />
          <button className="play-btn">
            <PlayIcon />
          </button>
          <span className="duration">4:36</span>
        </Thumbnail>
        <CategoryName>
          {data?.find((item) => item.id === course.categoryTopicId)?.name}
        </CategoryName>
        <Link href={`${Path.courses}/${course.id}`}>
          <Title style={{ cursor: "pointer" }}>{course.name}</Title>
        </Link>
        <Box margin="auto 0 0">
          <VideoFigures>
            428,304 views
            <span>•</span>
            49,206 likes
          </VideoFigures>
        </Box>
      </Content>
    </VideoCardWrapper>
  );
};

export default CourseCard;
