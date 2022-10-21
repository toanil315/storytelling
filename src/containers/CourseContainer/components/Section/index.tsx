import React from "react";
import Box from "src/components/commons/Box";
import Collapse from "src/components/commons/Collapse";
import Text from "src/components/commons/Typography";
import Lecture from "../Lecture";

interface Props {
  name: string;
  lectures: {
    name: string;
    link: string;
    thumbnail: string;
  }[];
  index: number;
}

const Section = ({ name, lectures, index }: Props) => {
  const renderLecture = () => {
    return lectures.map((lecture, index) => {
      return <Lecture key={index} lecture={lecture} index={index + 1} />;
    });
  };

  return (
    <Collapse header={<SectionHeader name={name} index={index} />}>
      {renderLecture()}
    </Collapse>
  );
};

const SectionHeader = ({ name, index }: { name: string; index: number }) => {
  return (
    <Box bg="lightGray" style={{ cursor: "pointer" }} padding="15px 10px">
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        Section {index}: {name}
      </Text>
    </Box>
  );
};

export default Section;
