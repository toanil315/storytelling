import { SliderBaseProps, SliderRangeProps } from "antd/lib/slider";
import React from "react";
import { StyledSlider } from "./styles";

interface CustomSliderProps extends SliderRangeProps, SliderBaseProps {}

const Slider = ({ ...restProps }: CustomSliderProps) => {
  return <StyledSlider<any> {...restProps} />;
};

export default Slider;
