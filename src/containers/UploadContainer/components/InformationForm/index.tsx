import { Col, Row } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Select from "src/components/commons/Select";
import Form from "src/components/Form";
import { HelpersUseStep } from "src/hooks/useStep";
import { upLoadInformationSchema } from "src/utils/schemas/UploadCourseSchema";
import { CourseBase } from "src/data-model/CourseTypes";
import useGetCategory from "src/hooks/apis/useGetCategory";
import useCreateCourse from "src/hooks/apis/useCreateCourse";
import useUser from "src/hooks/apis/useUser";

interface Props extends Partial<HelpersUseStep> {
  mode: "create" | "edit";
  defaultValues?: CourseBase;
  setCourseId: Dispatch<SetStateAction<string>>;
}

const emptyDefaultValues = {
  name: "",
  price: "",
  description: "",
  thumbnailUrl: "",
  categoryTopicId: "",
  hashTag: [],
  userId: "",
};

const InformationForm = ({
  goToNextStep,
  mode,
  defaultValues = emptyDefaultValues,
  setCourseId,
}: Props) => {
  const { data: categoryData } = useGetCategory();
  const { createCourse, isLoading, data: courseData } = useCreateCourse();
  const { user } = useUser();
  const onSubmit: SubmitHandler<CourseBase> = async (data) => {
    delete data.hashTag;
    const validValues = {
      ...data,
      price: String(data.price),
      description: JSON.stringify(data.description),
      // userId: user.id,
      userId: "80959a61-7245-438e-ba26-d2232cce3fb1",
    };
    createCourse(validValues);
  };

  useEffect(() => {
    if (!isLoading && courseData) {
      console.log(courseData);
      setCourseId(courseData.id);
      goToNextStep && goToNextStep();
    }
  }, [isLoading, courseData]);

  return (
    <Box>
      <Form
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        schema={upLoadInformationSchema}
        margin="0 auto"
      >
        {({ control }) => (
          <>
            <Form.Input
              placeholder="Enter title here"
              name="name"
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
                  name="thumbnailUrl"
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
                  name="categoryTopicId"
                  allowClear
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Please select"
                  options={categoryData?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
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
                <Box
                  loading={isLoading}
                  as={Button}
                  width="50%"
                  type="submit"
                  margin="13px auto"
                >
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
