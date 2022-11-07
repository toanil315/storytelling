import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import Box from "src/components/commons/Box";
import ImageComponent from "src/components/commons/Image";
import { CategoryType, CourseType } from "src/data-model/CourseTypes";
import { formatDate } from "src/utils/helpers/formatDate";
import PublishCourseAction from "../components/PublishCourseActions";

export const getPublishCoursesColumn = (
  categories?: CategoryType[]
): ColumnsType<CourseType> => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (value) => (
        <Box className="truncate whitespace-normal">{value}</Box>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (value) => {
        return (
          <Box width="90%" height="50px">
            <ImageComponent
              objectFit="cover"
              src={value}
              alt="thumbnail image"
            />
          </Box>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categoryTopicId",
      key: "categoryTopicId",
      render: (value) => {
        return (
          <Tag color="green">
            {categories?.find((item) => item.id === value)?.name}
          </Tag>
        );
      },
    },
    {
      title: "HashTag",
      dataIndex: "hashTags",
      key: "hashTags",
      render: (value) => {
        return (
          <>
            <Tag key={1}>English</Tag>
            <Tag key={2}>beginners</Tag>
          </>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return formatDate(value);
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (value, record) => {
        return <PublishCourseAction record={record} />;
      },
    },
  ];
};
