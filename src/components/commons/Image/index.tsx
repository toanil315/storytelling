import React from "react";
import Box from "../Box";
import Image from "next/image";

interface Props {
  src: string;
}

const ImageComponent = ({ src }: Props) => {
  return (
    <Box style={{ position: "relative" }} width="100%" height="100%">
      <Image
        className="w-full h-full"
        src={src}
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
};

export default ImageComponent;
