import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Form from "src/components/Form";
import { upLoadInformationSchema } from "src/utils/schemas/UploadCourseSchema";

interface InformationInputProps {
  title: string;
  description: string;
}

const InformationForm = () => {
  const onSubmit: SubmitHandler<InformationInputProps> = (data) =>
    console.log(data);

  return (
    <Box>
      <Form
        defaultValues={{
          title: "",
          description: "",
        }}
        onSubmit={onSubmit}
        schema={upLoadInformationSchema}
        margin="0 auto"
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter title here"
              name="title"
              label="Title"
              control={control}
            />
            <Form.Input
              placeholder="Enter description here"
              name="description"
              label="Description"
              control={control}
              as="textEditor"
            />
            <Box width="100%">
              <Box as={Button} width="50%" type="submit" margin="13px auto">
                Submit
              </Box>
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default InformationForm;
