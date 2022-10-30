import React, { ChangeEvent, useState } from "react";
import Box, { BoxProps } from "../Box";
import { Progress, ProgressBar } from "./styles";
import UploadFileIcon from "src/components/icons/UploadFileIcon";
import Center from "../Center";
import Text from "../Typography";
import Upload from "src/services/UploadServices";
import CloseIcon from "src/components/icons/CloseIcon";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";

export interface FileUploadProps extends BoxProps {
  label?: string;
  onChange?: (value: string) => void;
  error?: { message?: string };
  isRequired?: boolean;
}

const FileUpload = ({
  label,
  error,
  onChange,
  isRequired,
  value,
  ...restProps
}: FileUploadProps) => {
  const { name } = restProps;
  const [showProgress, setShowProgress] = useState<boolean>(!!value);
  const [percentage, setPercentage] = useState<number>(0);
  const [linkFile, setLinkFile] = useState<string>(value ?? "");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // reset file upload component before upload new file to server
    setShowProgress(true);
    setPercentage(0);
    setLinkFile("");

    const formData = new FormData();
    const files = e.target.files;
    if (files) {
      const fileData = files[0];
      const fileType = files[0].type.split("/")[0];
      formData.append("file", fileData);

      const config = {
        onUploadProgress: function (progressEvent: ProgressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          if (percentCompleted === 100) {
            percentCompleted -= 1;
          }
          setPercentage(percentCompleted);
        },
      };

      const dataUpload = await Upload(formData, config, fileType);
      setPercentage(100);
      onChange && onChange(dataUpload);
      setLinkFile(dataUpload);
      e.target.value = "";
    }
  };

  const handleCancel = () => {
    setShowProgress(false);
    setPercentage(0);
    onChange && onChange("");
    setLinkFile("");
  };

  return (
    <Box>
      {label && (
        <Box
          as={Text}
          fontSize="xs"
          fontWeight="regular"
          lineHeight="small"
          color="text"
          margin="0 0 5px"
        >
          {label}
          {isRequired && (
            <Box as="span" color="danger">
              {" "}
              *
            </Box>
          )}
        </Box>
      )}

      <Box style={{ cursor: "pointer" }} as="label" htmlFor={name}>
        <Center
          bg="lightGray"
          padding="20px 20px"
          borderRadius="large"
          margin="0 auto 5px"
          flexDirection="column"
          borderWidth="2px"
          borderStyle="solid"
          borderColor={error ? "danger" : "transparent"}
        >
          <UploadFileIcon />
          <Box
            as={Text}
            fontSize="sm"
            fontWeight="medium"
            lineHeight="normal"
            color="text"
            padding="20px 0 5px"
          >
            Upload Your{" "}
            <Box as="span" color="danger">
              Videos,{" "}
            </Box>
            <Box as="span" color="danger">
              Images
            </Box>
          </Box>
          <Text
            fontSize="xs"
            fontWeight="regular"
            lineHeight="small"
            color="text"
          >
            Supports: MP4, MOV, WMV
          </Text>
        </Center>
      </Box>
      <input
        {...restProps}
        onChange={handleFileChange}
        id={name}
        hidden
        type="file"
        accept="video/*,image/*"
      />
      {showProgress ? (
        <ProgressBar>
          <Box
            as={Text}
            fontSize="sm"
            fontWeight="medium"
            lineHeight="large"
            color="text"
          >
            {percentage === 100 || linkFile ? "Uploaded" : "Uploading..."}
          </Box>
          {percentage === 100 || linkFile ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <a target="_blank" href={linkFile}>
                <Text
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="large"
                  color="text"
                >
                  {linkFile}
                </Text>
              </a>
              <Box onClick={handleCancel} as="button">
                <CloseIcon />
              </Box>
            </Box>
          ) : (
            <Center>
              <Progress width={percentage} />
              <Box
                as={Text}
                padding="0 0 0 10px"
                fontSize="sm"
                fontWeight="medium"
                lineHeight="large"
                color="text"
              >
                {percentage}%
              </Box>
            </Center>
          )}
        </ProgressBar>
      ) : null}
      {error?.message && <ErrorMessage text={error.message} />}
    </Box>
  );
};

export default FileUpload;
