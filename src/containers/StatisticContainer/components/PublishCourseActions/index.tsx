import React from "react";
import Box from "src/components/commons/Box";
import EditIcon from "src/components/icons/EditIcon";
import DeleteIcon from "src/components/icons/DeleteIcon";
import EyeIcon from "src/components/icons/ViewIcon";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";

interface Props {
  record: any;
}

const PublishCourseAction = ({ record }: Props) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box
        className="cursor-pointer"
        padding="5px"
        borderRadius="md"
        border="1px solid"
        borderColor="primary"
        bg="primary"
        margin="0 5px 0 0 "
        onClick={() => router.push(`${Path.courses}/${record.id}`)}
      >
        <EyeIcon fill="white" />
      </Box>
      <Box
        className="cursor-pointer"
        padding="5px"
        borderRadius="md"
        border="1px solid"
        borderColor="green"
        bg="green"
        margin="0 5px"
        onClick={() => router.push(`${Path.courses}/edit/${record.id}`)}
      >
        <EditIcon fill="white" />
      </Box>
      <Box>
        <Box
          className="cursor-pointer"
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
};

export default PublishCourseAction;
