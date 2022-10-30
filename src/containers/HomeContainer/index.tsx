import React from "react";
import CourseCard from "src/components/CourseCard";
import { HomeContainerWrapper, Section, Title } from "./style";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Path } from "src/utils/Path";
import { CourseType } from "src/data-model/CourseTypes";

interface Props {
  courses: CourseType[];
}

const HomeContainer = ({ courses }: Props) => {
  const { t, i18n } = useTranslation();
  console.log(courses);

  const renderCourseList = () => {
    return courses.map((courseItem) => (
      <CourseCard key={courseItem.id} course={courseItem} />
    ));
  };

  return (
    <HomeContainerWrapper>
      <Section>
        <Title>Popular</Title>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          {renderCourseList()}
        </div>
      </Section>
    </HomeContainerWrapper>
  );
};

export default HomeContainer;
