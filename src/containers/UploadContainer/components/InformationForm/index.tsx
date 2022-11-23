import { Col, Row } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Select from "src/components/commons/Select";
import Form from "src/components/Form";
import { HelpersUseStep } from "src/hooks/useStep";
import { upLoadInformationSchema } from "src/utils/schemas/UploadCourseSchema";
import { CourseBase, CourseType } from "src/data-model/CourseTypes";
import {
  useCreateCourse,
  useGetCategory,
  useUpdateCourse,
  useUser,
} from "src/hooks/apis";

interface Props extends Partial<HelpersUseStep> {
  mode: "create" | "edit";
  defaultValues?: Partial<CourseType>;
  setCourseId: Dispatch<SetStateAction<string>>;
}

const emptyDefaultValues = {
  name: "",
  price: "",
  description: "",
  thumbnailUrl: "",
  categoryTopicId: undefined,
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
  const {
    createCourse,
    isLoading: createCourseLoading,
    data: courseData,
    isSuccess: createCourseSuccess,
  } = useCreateCourse();
  const {
    updateCourse,
    isLoading: updateCourseLoading,
    isSuccess: updateCourseSuccess,
  } = useUpdateCourse();

  const { user } = useUser();
  const onSubmit: SubmitHandler<Partial<CourseType>> = async (data) => {
    const validValues = {
      name: data.name,
      price: String(data.price),
      description: JSON.stringify(data.description),
      thumbnailUrl: data.thumbnailUrl,
      categoryTopicId: data.categoryTopicId,
      userId: user?.userId,
      hashtags: [],
    };

    if (mode === "create") {
      createCourse(validValues);
    } else {
      defaultValues.id && updateCourse(validValues, defaultValues.id);
    }
  };

  useEffect(() => {
    if (
      (createCourseSuccess || updateCourseSuccess) &&
      (courseData || defaultValues.id)
    ) {
      const id = mode === "create" ? courseData?.id : defaultValues.id;
      setCourseId(id ?? "");
      goToNextStep && goToNextStep();
    }
  }, [
    createCourseSuccess,
    updateCourseSuccess,
    courseData,
    defaultValues,
    mode,
    setCourseId,
    goToNextStep,
  ]);

  console.log(createCourseSuccess, createCourseSuccess);

  return (
    <Box>
      <Form
        defaultValues={{
          ...defaultValues,
          description: defaultValues.description
            ? JSON.parse(defaultValues.description)
            : "",
        }}
        onSubmit={onSubmit}
        schema={upLoadInformationSchema}
        margin="0 auto"
        enableResetForm={mode === "edit"}
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
                  loading={createCourseLoading || updateCourseLoading}
                  as={Button}
                  width="50%"
                  type="submit"
                  margin="13px auto"
                >
                  Submit
                </Box>
              ) : (
                <Box display="flex" justifyContent="center">
                  <Button
                    onClick={goToNextStep}
                    $type="white"
                    type="button"
                    width="20%"
                  >
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
