import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import { newSectionSchema } from "src/utils/schemas/UploadCourseSchema";

interface NewSectionInputProps {
  title: string;
}

interface Props {
  handleSubmit: (value: { title: string }) => void;
}

const NewSectionForm = ({ handleSubmit }: Props) => {
  const onSubmit: SubmitHandler<NewSectionInputProps> = (data) => {
    handleSubmit && handleSubmit(data);
  };

  return (
    <Box
      width="100%"
      padding="20px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="textLight"
    >
      <Text fontSize="sm" fontWeight="medium" lineHeight="normal" color="text">
        New Section:
      </Text>
      <Form
        width="100%"
        margin="30px 0 0 0"
        defaultValues={{
          title: "",
        }}
        onSubmit={onSubmit}
        schema={newSectionSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter section title here"
              name="title"
              label="Section Title"
              control={control}
            />
            <Box width="100%">
              <Box as={Button} type="submit" margin="13px 0 0 auto">
                Add Section
              </Box>
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default NewSectionForm;
