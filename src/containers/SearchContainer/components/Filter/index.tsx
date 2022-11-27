import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Text from "src/components/commons/Typography";
import { useGetCategory, useGetHashTags } from "src/hooks/apis";
import { QUERY_PARAMS_FOR_SEARCH_COURSE } from "src/utils/constants";
import { Path } from "src/utils/Path";
import { FilterItemWrapper } from "./styles";

const FilterCourse = () => {
  const { data: categories } = useGetCategory();
  const { data: hashtags } = useGetHashTags();
  const router = useRouter();

  const handleClickFilterItem = (item: string, queryKey: string) => {
    let params: string | string[] | undefined = router.query[queryKey];
    if (typeof params === "string") {
      params = [params];
    }

    const setOfQueryParams = new Set(params ? [...Array.from(params)] : []);
    if (setOfQueryParams.has(item)) {
      setOfQueryParams.delete(item);
    } else {
      setOfQueryParams.add(item);
    }

    router.replace(
      {
        pathname: Path.search,
        query: {
          ...router.query,
          [queryKey]: Array.from(setOfQueryParams) as string[],
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderCategory = useMemo(() => {
    const params = router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.category];
    let categoryParams: string[] = [];

    if (typeof params === "string") {
      categoryParams = [params];
    } else {
      categoryParams = params as string[];
    }

    return categories?.map((category) => {
      return (
        <FilterItem
          active={
            categoryParams
              ? categoryParams?.findIndex((item) => item === category.name) !==
                -1
              : false
          }
          key={category.id}
          item={category.name}
          queryKey={QUERY_PARAMS_FOR_SEARCH_COURSE.category}
          handleClickFilterItem={handleClickFilterItem}
        />
      );
    });
  }, [router.query, categories]);

  const renderHashTags = useMemo(() => {
    const params = router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.hashtag];
    let hashtagParams: string[] = [];

    if (typeof params === "string") {
      hashtagParams = [params];
    } else {
      hashtagParams = params as string[];
    }

    return hashtags?.map((hashtag) => {
      return (
        <FilterItem
          active={
            hashtagParams
              ? hashtagParams?.findIndex((item) => item === hashtag.name) !== -1
              : false
          }
          key={hashtag.id}
          item={hashtag.name}
          queryKey={QUERY_PARAMS_FOR_SEARCH_COURSE.hashtag}
          handleClickFilterItem={handleClickFilterItem}
        />
      );
    });
  }, [router.query, hashtags]);

  return (
    <Box
      width="100%"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      padding="15px"
      borderRadius="large"
    >
      <Box margin="0 0 20px">
        <Text fontSize="md" fontWeight="bold" color="text">
          Filters:
        </Text>
      </Box>
      <Box margin="0 0 25px">
        <Collapse header={"Category"}>{renderCategory}</Collapse>
      </Box>
      <Box margin="0 0 25px">
        <Collapse header={"HashTag"}>{renderHashTags}</Collapse>
      </Box>
    </Box>
  );
};

interface FilterItemProps {
  item: string;
  queryKey: string;
  handleClickFilterItem: (item: string, queryKey: string) => void;
  active?: boolean;
}

const FilterItem = ({
  item,
  queryKey,
  handleClickFilterItem,
  active = false,
}: FilterItemProps) => {
  return (
    <Box
      display="inline-block"
      onClick={() => handleClickFilterItem(item, queryKey)}
    >
      <FilterItemWrapper active={active}>{item}</FilterItemWrapper>
    </Box>
  );
};

export default FilterCourse;
