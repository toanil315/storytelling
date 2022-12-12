import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import Box from "src/components/commons/Box";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import { CategoryType, CourseType } from "src/data-model/CourseTypes";
import { PurchasedDetail } from "src/data-model/PaymentTypes";
import { formatDate } from "src/utils/helpers/formatDate";
import formatNumber from "src/utils/helpers/formatNumber";
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

export const getPurchasedDetailColumns = (): ColumnsType<PurchasedDetail> => {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "user.fullName",
      key: "user.fullName",
      render: (value, record) => <Box>{record.user.fullName}</Box>,
    },
    {
      title: "Avatar",
      dataIndex: "user.avatarUrl",
      key: "user.avatarUrl",
      render: (_, record) => {
        return (
          <Box
            width="50px"
            height="50px"
            borderRadius="rounded"
            overflow="hidden"
          >
            <ImageComponent
              objectFit="cover"
              src={record.user.avatarUrl ?? ""}
              alt="avatar image"
            />
          </Box>
        );
      },
    },
    {
      title: "Course",
      dataIndex: "course.name",
      key: "course.name",
      render: (_, record) => {
        return (
          <Box className="truncate whitespace-normal">{record.course.name}</Box>
        );
      },
    },
    {
      title: "Course Image",
      dataIndex: "course.thumbnailUrl",
      key: "course.thumbnailUrl",
      render: (_, record) => {
        return (
          <Box
            width="120px"
            height="80px"
            borderRadius="rounded"
            overflow="hidden"
          >
            <ImageComponent
              objectFit="contain"
              src={record.course.thumbnailUrl ?? ""}
              alt="avatar image"
            />
          </Box>
        );
      },
    },
    {
      title: "Income",
      dataIndex: "amount",
      key: "amount",
      render: (value) => {
        return (
          <Text fontSize="sm" fontWeight="bold" color="green">
            +{formatNumber(value)}Vnd
          </Text>
        );
      },
    },
  ];
};
