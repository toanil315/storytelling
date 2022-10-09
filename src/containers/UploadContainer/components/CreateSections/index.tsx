import { Col, Row } from "antd";
import React, { useState } from "react";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import PlusIcon from "src/components/icons/PlusIcon";
import NewSectionForm from "../NewSectionForm";
import Section from "../Section";

const CreateSections = () => {
  const [canAddSection, setCanAddSection] = useState<boolean>(true);

  const [sections, setSections] = useState<
    {
      id: string;
      title: string;
      lectures: {
        id: string;
        title: string;
        video: string;
      }[];
    }[]
  >([
    {
      id: "1",
      title: "Introduction",
      lectures: [
        {
          id: "lecture 1",
          title: "Pasta ingredients",
          video: "abc",
        },
      ],
    },
  ]);

  const renderSection = () => {
    return sections.map((section, index) => (
      <Col key={section.id} span={24}>
        <Section section={section} sectionIndex={index} />
      </Col>
    ));
  };

  const handleAddSection = (section: { title: string }) => {
    setSections((sections) => [
      ...sections,
      { ...section, id: String(Date.now()), lectures: [] },
    ]);
    setCanAddSection(true);
  };

  return (
    <Box>
      <Row gutter={[20, 30]}>
        {renderSection()}
        {!canAddSection && (
          <Col span={24}>
            <NewSectionForm handleSubmit={handleAddSection} />
          </Col>
        )}
        {canAddSection && (
          <Col span={24}>
            <Box
              onClick={() => setCanAddSection(false)}
              as={PlusIcon}
              style={{ cursor: "pointer" }}
              width={40}
              height={40}
              margin="20px auto 0"
            />
          </Col>
        )}
        <Col span={24}>
          <Box as={Button} width="50%" margin="20px auto 0">
            Publish Course
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default CreateSections;
