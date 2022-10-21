import React from "react";
import Box from "../Box";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const ImageComponent = ({ src, alt }: Props) => {
  return (
    <Box style={{ position: "relative" }} width="100%" height="100%">
      <Image
        className="w-full h-full"
        src={src}
        layout="fill"
        objectFit="contain"
        alt={alt}
      />
    </Box>
  );
};

export default ImageComponent;
