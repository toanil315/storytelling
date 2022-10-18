import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Box from "src/components/commons/Box";
import Comments from "./components/Comments";
import VideoPlay from "./components/VideoPlay";
import VideoPlayList from "./components/VideoPlayList";

const CourseContainer = () => {
  const [height, setHeight] = useState<number>(0);
  const mainColRef = useRef<any>(null);

  useEffect(() => {
    window.scrollY = 0;
  }, []);

  useEffect(() => {
    setHeight(mainColRef.current.clientHeight);
  }, [mainColRef.current]);

  return (
    <Box margin="30px 0 0">
      <Box as={Row} width="100%" gutter={[10, 0]}>
        <Col ref={mainColRef} span={16}>
          <Box as={Row} width="100%" gutter={[0, 30]}>
            <Col span={24}>
              <VideoPlay />
            </Col>
            <Col span={24}>
              <Comments />
            </Col>
          </Box>
        </Col>
        <Col span={8}>
          <VideoPlayList height={height} />
        </Col>
      </Box>
    </Box>
  );
};

export default CourseContainer;
