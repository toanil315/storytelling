import styled from "styled-components";

import {
  compose,
  color,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
} from "styled-system";

const StyledBox = styled("div")(
  compose(
    color,
    space,
    layout,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow
  )
);

export type BoxProps = any;

export const Box = (props: BoxProps) => {
  return <StyledBox {...props} />;
};

export default Box;
