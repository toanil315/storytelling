import React from "react";
import { SearchbarWrapper } from "./styles";
import WaveIcon from "src/components/icons/WaveIcon";
import SearchIcon from "src/components/icons/SearchIcon";

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <WaveIcon />
      <input placeholder="Search something..." />
      <SearchIcon />
    </SearchbarWrapper>
  );
};

export default Searchbar;
