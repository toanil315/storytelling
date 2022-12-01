import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Input from "src/components/commons/Input";
import Slider from "src/components/commons/Slider";
import Text from "src/components/commons/Typography";
import { useDebounceWithoutDependencies } from "src/hooks";
import { useGetCategory, useGetHashTags } from "src/hooks/apis";
import {
  MIN_MAX_PRICE_OF_COURSES,
  QUERY_PARAMS_FOR_SEARCH_COURSE,
} from "src/utils/constants";
import { Path } from "src/utils/Path";
import { FilterItemWrapper } from "./styles";

const FilterCourse = () => {
  const { data: categories } = useGetCategory();
  const { data: hashtags } = useGetHashTags();
  const router = useRouter();

  const [priceRange, setPriceRange] = useState<{ start: number; end: number }>({
    start: MIN_MAX_PRICE_OF_COURSES.MIN,
    end: MIN_MAX_PRICE_OF_COURSES.MAX,
  });
  const { setDebounce } = useDebounceWithoutDependencies(300);

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

  const handleSliderChange = (value: number[]) => {
    setPriceRange({
      start: value[0],
      end: value[1],
    });
  };

  const handleInputPriceChange = (side: "start" | "end") => {
    return (value: number) => {
      setDebounce(() => {
        setPriceRange((prev) => ({
          ...prev,
          [side]: Number(value),
        }));
      });
    };
  };

  useEffect(() => {
    setDebounce(() => {
      router.replace(
        {
          pathname: Path.search,
          query: {
            ...router.query,
            [QUERY_PARAMS_FOR_SEARCH_COURSE.minPrice]: priceRange.start,
            [QUERY_PARAMS_FOR_SEARCH_COURSE.maxPrice]: priceRange.end,
          },
        },
        undefined,
        { shallow: true }
      );
    });
  }, [priceRange]);

  useEffect(() => {
    const minPrice = router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.minPrice]
      ? Number(router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.minPrice])
      : 0;
    const maxPrice = router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.maxPrice]
      ? Number(router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.maxPrice])
      : 0;

    if (minPrice && minPrice !== priceRange.start) {
      setPriceRange((prev) => ({ ...prev, start: minPrice }));
    }

    if (maxPrice && maxPrice !== priceRange.end) {
      setPriceRange((prev) => ({ ...prev, end: maxPrice }));
    }
  }, [router.query]);

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
        <Text>Price:</Text>
        <Box as={Row} margin="10px 0 20px" gutter={[10]}>
          <Col span={24}>
            <Slider
              onChange={handleSliderChange}
              value={[priceRange.start, priceRange.end]}
              min={MIN_MAX_PRICE_OF_COURSES.MIN}
              max={MIN_MAX_PRICE_OF_COURSES.MAX}
              range
            />
          </Col>
          <Col span={10}>
            <Input
              handleChange={handleInputPriceChange("start")}
              value={priceRange.start}
              min={MIN_MAX_PRICE_OF_COURSES.MIN}
              max={MIN_MAX_PRICE_OF_COURSES.MAX}
              padding="5px 0"
              suffixIcon="$"
              suffixPosition="right"
              type="number"
            />
          </Col>

          <Col offset={4} span={10}>
            <Input
              handleChange={handleInputPriceChange("end")}
              value={priceRange.end}
              min={MIN_MAX_PRICE_OF_COURSES.MIN}
              max={MIN_MAX_PRICE_OF_COURSES.MAX}
              padding="5px 0"
              suffixIcon="$"
              suffixPosition="right"
              type="number"
            />
          </Col>
        </Box>
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
