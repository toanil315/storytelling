import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import { newSectionSchema } from "src/utils/schemas/UploadCourseSchema";

interface NewSectionInputProps {
  sectionName: string;
}

interface Props {
  loading: boolean;
  handleSubmit: (sectionName: string) => void;
}

const NewSectionForm = ({ handleSubmit, loading }: Props) => {
  const onSubmit: SubmitHandler<NewSectionInputProps> = (data) => {
    handleSubmit(data.sectionName);
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
          sectionName: "",
        }}
        onSubmit={onSubmit}
        schema={newSectionSchema}
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter section title here"
              name="sectionName"
              label="Section Title"
              control={control}
            />
            <Box width="100%">
              <Box
                loading={loading}
                as={Button}
                type="submit"
                margin="13px 0 0 auto"
              >
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
