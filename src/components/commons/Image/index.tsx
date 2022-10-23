import React from "react";
import Box from "../Box";
import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {
  src: string;
  alt: string;
}

const ImageComponent = ({
  src,
  alt,
  objectFit = "contain",
  layout = "fill",
  ...restProps
}: Props) => {
  return (
    <Box style={{ position: "relative" }} width="100%" height="100%">
      <Image
        className="w-full h-full"
        src={src}
        layout={layout}
        objectFit={objectFit}
        alt={alt}
        {...restProps}
      />
    </Box>
  );
};

export default ImageComponent;
