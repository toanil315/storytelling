import React, { useEffect, useState } from "react";
import Box from "src/components/commons/Box";
import CourseCard from "src/components/CourseCard";
import { UserType } from "src/data-model/UserTypes";
import { useGetCourses, useGetUserByIdParallel } from "src/hooks/apis";

const SearchResult = () => {
  const { data: courses } = useGetCourses();
  const [usersById, setUsersById] = useState<
    { [key: string]: UserType } | undefined
  >(undefined);

  const { users, isLoading, isError } = useGetUserByIdParallel(
    courses?.map((course) => course.userId) ?? []
  );

  useEffect(() => {
    if (!isLoading && !isError && users) {
      setUsersById({
        ...users.reduce((acc, current) => {
          return { ...acc, [current?.userId as string]: current };
        }, {}),
      });
    }
  }, [isLoading, isError]);

  const renderCourseList = () => {
    return courses?.map((courseItem) => (
      <CourseCard
        key={courseItem.id}
        course={courseItem}
        user={usersById?.[courseItem.userId]}
      />
    ));
  };

  return (
    <Box className="grid grid-cols-3 gap-x-4 gap-y-8">{renderCourseList()}</Box>
  );
};

export default SearchResult;
