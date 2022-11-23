import { Col, Row } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Select from "src/components/commons/Select";
import Form from "src/components/Form";
import { HelpersUseStep } from "src/hooks/useStep";
import { upLoadInformationSchema } from "src/utils/schemas/UploadCourseSchema";
import {
  CourseBase,
  CourseType,
  HashTagType,
} from "src/data-model/CourseTypes";
import {
  useCreateCourse,
  useGetCategory,
  useGetHashTags,
  useUpdateCourse,
  useUser,
} from "src/hooks/apis";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/utils/constants";

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
  hashtags: [],
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
  const { data: hashTags } = useGetHashTags();
  const queryClient = useQueryClient();
  const [temporarySelectValue, setTemporarySelectValue] = useState<string>("");

  const onSubmit: SubmitHandler<Partial<CourseType>> = async (data) => {
    const validValues = {
      name: data.name,
      price: String(data.price),
      description: JSON.stringify(data.description),
      thumbnailUrl: data.thumbnailUrl,
      categoryTopicId: data.categoryTopicId,
      userId: user?.userId,
      hashtags: data.hashtags ?? [],
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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if user typing and don't enter
    if (e.which >= 48 && e.which <= 90) {
      setTemporarySelectValue((prev) => prev + e.key);
    }
    if (e.key === "Enter" && Boolean(temporarySelectValue.trim())) {
      const index = hashTags?.findIndex(
        (item) => item.name === temporarySelectValue.trim()
      );
      index === -1 &&
        queryClient.setQueryData(QUERY_KEYS.GET_HASH_TAGS, (old: any) => {
          return {
            ...old,
            data: [
              ...old.data,
              {
                name: temporarySelectValue.trim(),
                id: String(Date.now()),
                createdAt: String(Date.now()),
                updatedAt: String(Date.now()),
              } as HashTagType,
            ],
          };
        });
      setTemporarySelectValue("");
    }
  };

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
                  name="hashtags"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={hashTags?.map((hashTag) => ({
                    value: hashTag.name,
                    label: hashTag.name,
                  }))}
                  control={control}
                  filterOption={(inputValue, option) => {
                    return (
                      option?.props.label
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0
                    );
                  }}
                  onKeyDown={handleInputKeyDown}
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
