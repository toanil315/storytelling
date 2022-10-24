import { Col, Row } from "antd";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Select from "src/components/commons/Select";
import Form from "src/components/Form";
import { HelpersUseStep } from "src/hooks/useStep";
import { upLoadInformationSchema } from "src/utils/schemas/UploadCourseSchema";
import { CourseType } from "src/utils/types/CourseTypes";

interface Props extends Partial<HelpersUseStep> {
  mode: "create" | "edit";
  defaultValues?: Partial<CourseType>;
}

const InformationForm = ({ goToNextStep, mode, defaultValues }: Props) => {
  const onSubmit: SubmitHandler<Partial<CourseType>> = (data) => {
    console.log(data);
    goToNextStep && goToNextStep();
  };

  return (
    <Box>
      <Form
        defaultValues={{
          title: "",
          description: "",
          thumbnail: "",
          category: "",
          price: 0,
          hashTag: [],
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
              isRequired
            />
            <Form.Input
              placeholder="Enter description here"
              name="description"
              label="Description"
              control={control}
              as="textEditor"
              isRequired
            />
            <Box as={Row} gutter={[30, 30]}>
              <Col span={24}>
                <Form.FileUpload
                  label="Thumbnail"
                  name="thumbnail"
                  control={control}
                />
              </Col>
              <Col span={12}>
                <Form.Input
                  placeholder="Enter price here"
                  label="Price"
                  name="price"
                  control={control}
                  isRequired
                />
              </Col>
              <Col span={12}>
                <Form.Select
                  label="Category"
                  name="category"
                  allowClear
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Please select"
                  options={[
                    { label: "abc", value: 1 },
                    { label: "def", value: 2 },
                  ]}
                  control={control}
                  filterOption={(inputValue, option) => {
                    return (
                      option?.props.label
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0
                    );
                  }}
                />
              </Col>
              <Col span={24}>
                <Form.Select
                  label="Hash Tag"
                  name="hashTag"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={[
                    { label: "abc", value: 1 },
                    { label: "def", value: 2 },
                  ]}
                  control={control}
                  filterOption={(inputValue, option) => {
                    return (
                      option?.props.label
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0
                    );
                  }}
                />
              </Col>
            </Box>
            <Box width="100%" margin="40px 0">
              {mode === "create" ? (
                <Box as={Button} width="50%" type="submit" margin="13px auto">
                  Submit
                </Box>
              ) : (
                <Box display="flex" justifyContent="center">
                  <Button $type="white" type="button" width="20%">
                    <Box padding="0 20px">Next</Box>
                  </Button>
                  <Box
                    as={Button}
                    width="20%"
                    type="submit"
                    margin="0 0 0 15px"
                  >
                    Save
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </Form>
    </Box>
  );
};

export default InformationForm;
