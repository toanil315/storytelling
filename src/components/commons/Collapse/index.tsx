import React, { useRef, useState } from "react";
import Box, { BoxProps } from "../Box";
import { CollapseArrow, CollapseHeader } from "./styles";
import DropDownIcon from "src/components/icons/DropDownIcon";
import RightIcon from "src/components/icons/RightIcon";
import Text from "../Typography";

interface Props extends BoxProps {
  header: JSX.Element | JSX.Element[] | string | number | undefined;
}

const Collapse = ({ header, children, ...restProps }: Props) => {
  const [isExpand, setExpand] = useState<boolean>(false);
  const childRef = useRef(null);
  const toggleChildList = () => setExpand((prev) => !prev);

  return (
    <Box>
      <CollapseHeader onClick={toggleChildList}>
        {header}
        <CollapseArrow>
          {isExpand ? <DropDownIcon /> : <RightIcon />}
        </CollapseArrow>
      </CollapseHeader>
      <div
        style={{
          maxHeight: isExpand ? "unset" : 0,
          overflow: "hidden",
        }}
        ref={childRef}
      >
        {children}
      </div>
    </Box>
  );
};

export default Collapse;
