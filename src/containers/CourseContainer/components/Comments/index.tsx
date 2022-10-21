import React from "react";
import { useTranslation } from "react-i18next";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Input from "src/components/commons/Input";
import Text from "src/components/commons/Typography";
import ShareIcon from "src/components/icons/ShareIcon";

const Comments = () => {
  const { t } = useTranslation();

  return (
    <Box width="100%" bg="white" padding="25px 10px" borderRadius="md">
      <Text fontSize="base" fontWeight="bold" lineHeight="large" color="text">
        {t("comments")}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        style={{ gap: 15 }}
        margin="20px 0"
      >
        <Box
          width="50px"
          height="50px"
          borderRadius="rounded"
          overflow="hidden"
          flexShrink="0"
        >
          <ImageComponent src="/assets/ava.png" alt="avatar" />
        </Box>
        <Input placeholder="Enter comment here" />
        <Button>
          <ShareIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Comments;
