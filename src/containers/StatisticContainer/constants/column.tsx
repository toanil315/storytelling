import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import Box from "src/components/commons/Box";
import ImageComponent from "src/components/commons/Image";
import EditIcon from "src/components/icons/EditIcon";
import DeleteIcon from "src/components/icons/DeleteIcon";

export const publishCoursesColumn: ColumnsType<any> = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (value) => {
      return (
        <Box width="90%" height="50px">
          <ImageComponent objectFit="cover" src={value} alt="thumbnail image" />
        </Box>
      );
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (value) => {
      return <Tag color="green">{value.name}</Tag>;
    },
  },
  {
    title: "HashTag",
    dataIndex: "hashTags",
    key: "hashTags",
    render: (value) => {
      return value.map((hashTag: string) => <Tag key={hashTag}>{hashTag}</Tag>);
    },
  },
  {
    title: "Actions",
    dataIndex: "id",
    key: "id",
    render: (value) => {
      return (
        <Box display="flex">
          <Box
            padding="5px"
            borderRadius="md"
            border="1px solid"
            borderColor="green"
            bg="green"
            margin="0 5px"
          >
            <EditIcon fill="white" />
          </Box>
          <Box>
            <Box
              padding="5px"
              borderRadius="md"
              border="1px solid"
              borderColor="danger"
              bg="danger"
              margin="0 5px"
            >
              <DeleteIcon fill="white" />
            </Box>
          </Box>
        </Box>
      );
    },
  },
];
