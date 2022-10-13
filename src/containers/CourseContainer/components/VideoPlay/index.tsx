import React from "react";
import Box from "src/components/commons/Box";

const VideoPlay = () => {
  return (
    <Box width="100%">
      <video
        width={"100%"}
        controls
        src="https://res.cloudinary.com/toanil315/video/upload/v1665667912/pbl-6/file_example_MP4_480_1_5MG_fpvphz.mp4"
      />
    </Box>
  );
};

export default VideoPlay;
