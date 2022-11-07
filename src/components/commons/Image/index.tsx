import React, { useState } from "react";
import Box from "../Box";
import Image, { ImageProps } from "next/image";
import { FALL_BACK_IMAGE_URL } from "src/utils/constants";

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
  const [imgSrc, setSrc] = useState<string>(src);

  return (
    <Box style={{ position: "relative" }} width="100%" height="100%">
      <Image
        className="w-full h-full"
        src={imgSrc}
        layout={layout}
        objectFit={objectFit}
        alt={alt}
        onError={() => {
          setSrc(FALL_BACK_IMAGE_URL);
        }}
        onErrorCapture={() => {
          setSrc(FALL_BACK_IMAGE_URL);
        }}
        {...restProps}
      />
    </Box>
  );
};

export default ImageComponent;
