import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import { newLectureSchema } from "src/utils/schemas/UploadCourseSchema";

interface NewSectionInputProps {
  title: string;
  video: string;
}

interface Props {
  handleSubmit: (value: { title: string; video: string }) => void;
}

const NewLectureForm = ({ handleSubmit }: Props) => {
  const onSubmit: SubmitHandler<NewSectionInputProps> = (data) => {
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
        New Lecture:
      </Text>
      <Form
        width="100%"
        margin="30px 0 0 0"
        defaultValues={{
          title: "",
          video: "",
        }}
        onSubmit={onSubmit}
        schema={newLectureSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter lecture title here"
              name="title"
              label="Lecture Title"
              control={control}
            />
            <Form.FileUpload
              label="Lecture Video"
              name="video"
              control={control}
            />
            <Box width="100%">
              <Box as={Button} type="submit" margin="13px 0 0 auto">
                Add Lecture
              </Box>
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default NewLectureForm;
