import { Col, Row } from "antd";
import { link } from "fs";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import { LectureType } from "src/data-model/CourseTypes";
import { formatDuration } from "src/utils/helpers/formatDuration";
import { getDurationFromALink } from "src/utils/helpers/getDurationFromLink";
import { lectureSchema } from "src/utils/schemas/UploadCourseSchema";

interface Props {
  handleSubmit: (value: Partial<LectureType>) => void;
  mode: "create" | "edit";
  defaultValues?: Partial<LectureType>;
  loading: boolean;
  onCancel?: () => void;
}

const emptyDefaultValues = {
  description: "",
  duration: "",
  thumbnailUrl: "",
  title: "",
  url: "",
  isLock: true,
};

const LectureForm = ({
  handleSubmit,
  defaultValues = emptyDefaultValues,
  mode,
  loading,
  onCancel,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onSubmit: SubmitHandler<Partial<LectureType>> = async (data) => {
    const durationOfVideo = await getDurationFromALink(
      videoRef,
      data.url as string
    );
    data.duration = String(Math.trunc(durationOfVideo) / 60);
    data.description = JSON.stringify(data.description);
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
      <Form
        width="100%"
        defaultValues={{
          ...defaultValues,
          description: defaultValues.description
            ? JSON.parse(defaultValues.description)
            : "",
        }}
        onSubmit={onSubmit}
        schema={lectureSchema}
      >
        {({ control }) => (
          <>
            <Box className="flex items-center justify-between">
              <Box
                as={Text}
                fontSize="sm"
                fontWeight="medium"
                lineHeight="normal"
                color="text"
                padding="10px 0"
              >
                {mode === "create" ? "New" : "Edit"} Lecture:
              </Box>
              <Box>
                <Form.Switch label="Private" name="isLock" control={control} />
              </Box>
            </Box>
            <Box as={Row} width="calc(100% + 20px)" gutter={[20, 30]}>
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
                  name="url"
                  control={control}
                  accept="video"
                />
              </Col>
              <Col span={12}>
                <Form.FileUpload
                  label="Thumbnail"
                  name="thumbnailUrl"
                  control={control}
                />
              </Col>
              <Col span={24}>
                <Form.Input
                  as="textEditor"
                  label="Description"
                  name="description"
                  control={control}
                  placeholder="Enter description of lecture here..."
                />
              </Col>
            </Box>

            <Box width="100%">
              {mode === "create" ? (
                <Box
                  loading={loading}
                  as={Button}
                  type="submit"
                  margin="13px 0 0 auto"
                >
                  Add Lecture
                </Box>
              ) : (
                <Box className="flex justify-end" margin="13px 0 0 0px">
                  <Button
                    onClick={onCancel && onCancel}
                    $type="white"
                    type="button"
                    width="20%"
                  >
                    <Box padding="0 20px">Cancel</Box>
                  </Button>
                  <Box
                    loading={loading}
                    as={Button}
                    type="submit"
                    margin="0 0 0 15px"
                  >
                    Update Lecture
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </Form>
      <video ref={videoRef} style={{ display: "none" }} src="" />
    </Box>
  );
};

export default LectureForm;
