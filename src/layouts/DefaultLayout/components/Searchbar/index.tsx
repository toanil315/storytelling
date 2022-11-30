import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchbarWrapper } from "./styles";
import WaveIcon from "src/components/icons/WaveIcon";
import SearchIcon from "src/components/icons/SearchIcon";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import { QUERY_PARAMS_FOR_SEARCH_COURSE } from "src/utils/constants";

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSearchTerm(
      (router.query[QUERY_PARAMS_FOR_SEARCH_COURSE.query] as string) ?? ""
    );
  }, [router.query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({
      ...router.query,
      [QUERY_PARAMS_FOR_SEARCH_COURSE.query]: searchTerm,
    });
    router.push({
      pathname: Path.search,
      query: {
        ...router.query,
        [QUERY_PARAMS_FOR_SEARCH_COURSE.query]: searchTerm,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchbarWrapper>
        <WaveIcon />
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search something..."
        />
        <SearchIcon />
      </SearchbarWrapper>
    </form>
  );
};

export default Searchbar;
