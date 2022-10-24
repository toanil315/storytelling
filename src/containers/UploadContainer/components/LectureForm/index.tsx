import { Col, Row } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import { newLectureSchema } from "src/utils/schemas/UploadCourseSchema";
import { LectureType } from "src/utils/types/CourseTypes";

interface Props {
  handleSubmit: (value: Partial<LectureType>) => void;
  mode: "create" | "edit";
  defaultValues?: Partial<LectureType>;
}

const LectureForm = ({ handleSubmit, defaultValues, mode }: Props) => {
  const onSubmit: SubmitHandler<Partial<LectureType>> = (data) => {
    handleSubmit && handleSubmit(data);
  };

  return (
    <Box
      width="90%"
      padding="20px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="textLight"
      margin="0 auto"
      bg="white"
    >
      <Text fontSize="sm" fontWeight="medium" lineHeight="normal" color="text">
        {mode === "create" ? "New" : "Edit"} Lecture:
      </Text>
      <Form
        width="100%"
        margin="30px 0 0 0"
        defaultValues={
          mode === "create"
            ? {
                title: "",
                video: "",
                thumbnail: "",
              }
            : defaultValues
        }
        onSubmit={onSubmit}
        schema={newLectureSchema}
      >
        {({ control }) => (
          <>
            <Box as={Row} width="100%" gutter={[20, 30]}>
              <Col span={24}>
                <Form.Input
                  placeholder="Enter lecture title here"
                  name="title"
                  label="Lecture Title"
                  control={control}
                />
              </Col>
              <Col span={12}>
                <Form.FileUpload
                  label="Lecture Video"
                  name="video"
                  control={control}
                />
              </Col>
              <Col span={12}>
                <Form.FileUpload
                  label="Thumbnail"
                  name="thumbnail"
                  control={control}
                />
              </Col>
            </Box>

            <Box width="100%">
              {mode === "create" ? (
                <Box as={Button} type="submit" margin="13px 0 0 auto">
                  Add Lecture
                </Box>
              ) : (
                <Box as={Button} type="submit" margin="13px 0 0 auto">
                  Update Lecture
                </Box>
              )}
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default LectureForm;
