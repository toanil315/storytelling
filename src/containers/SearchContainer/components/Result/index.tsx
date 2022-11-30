import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Box from "src/components/commons/Box";
import CourseCard from "src/components/CourseCard";
import PlaceholderLoading from "src/components/commons/Loading";
import { UserType } from "src/data-model/UserTypes";
import { useDebounceWithoutDependencies } from "src/hooks";
import {
  useGetCourses,
  useGetUserByIdParallel,
  useSearchCourses,
} from "src/hooks/apis";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import { QUERY_PARAMS_FOR_SEARCH_COURSE } from "src/utils/constants";

const SearchResult = () => {
  const router = useRouter();
  const { setDebounce } = useDebounceWithoutDependencies(300);

  const {
    searchCourses,
    data: courses,
    isLoading: isSearchLoading,
  } = useSearchCourses(router.query);

  const [usersById, setUsersById] = useState<
    { [key: string]: UserType } | undefined
  >(undefined);

  const { users, isLoading, isError } = useGetUserByIdParallel(
    courses?.map((course) => course.userId) ?? []
  );

  useEffect(() => {
    setDebounce(() => searchCourses());
  }, [JSON.stringify(router.query)]);

  useEffect(() => {
    if (!isLoading && !isError && courses) {
      setUsersById({
        ...users?.reduce((acc, current) => {
          return { ...acc, [current?.userId as string]: current };
        }, {}),
      });
    }
  }, [isLoading, isError, courses]);

  const renderCourseList = () => {
    return courses?.map((courseItem) => (
      <CourseCard
        key={courseItem.id}
        course={courseItem}
        user={usersById?.[courseItem.userId]}
      />
    ));
  };

  if (isSearchLoading) {
    return <PlaceholderLoading />;
  }

  return courses?.length === 0 ? (
    <Center width="100%" className="flex-col p-4">
      <Box width="120%" height="300px">
        <ImageComponent src="/assets/empty.png" alt="empty" />
      </Box>
      <Text fontSize="sm" fontWeight="medium" lineHeight="large" color="text">
        Sorry, we couldn't find any results for "
        {router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.query]}"
      </Text>
    </Center>
  ) : (
    <Box className="grid grid-cols-3 gap-x-4 gap-y-8">{renderCourseList()}</Box>
  );
};

export default SearchResult;
