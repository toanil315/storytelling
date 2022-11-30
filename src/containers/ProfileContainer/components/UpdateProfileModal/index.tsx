import { Col, Row } from "antd";
import React, { ChangeEvent, useMemo } from "react";
import { Control, SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Center from "src/components/commons/Center";
import ImageComponent from "src/components/commons/Image";
import Loading from "src/components/commons/Loading";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import PlaceholderLoading from "src/components/commons/Loading";
import CustomModal from "src/components/Modal";
import StyledTabs from "src/components/Tabs/styles";
import { useGetUserDetail, useUploadAvatar } from "src/hooks/apis";
import { UseModalHelper } from "src/hooks/useModal";
import { userInformationSchema } from "src/utils/schemas/UserInformationSchema";
import ChangePasswordForm from "../ChangePasswordForm";
import InformationForm from "../InformationForm";
import { AvatarContainer, UploadAvatarWrapper } from "./styles";
import UploadIcon from "src/components/icons/UploadIcon";

interface Props {
  modal: UseModalHelper;
}

const UpdateProfileModal = ({
  modal: { show, toggleModal, closeModal },
}: Props) => {
  const { user, isLoading } = useGetUserDetail();
  const { uploadAvatar, isLoading: isUploadAvatarLoading } = useUploadAvatar();

  const items = useMemo(
    () => [
      {
        label: "Update Informations",
        key: 1,
        // should set to null so the search params of tab partnership like page, pageSize will not impact to tab leader
        // because tab leader will show only first 10 record with commission highest and no need params for pagination
        // but tab partner ship need 2 params page and pageSize for pagination
        children: (
          <Box margin="20px 0 0">
            <InformationForm />
          </Box>
        ),
      }, // remember to pass the key prop
      {
        label: "Change Password",
        key: 2,
        children: (
          <Box margin="20px 0 0">
            <ChangePasswordForm />
          </Box>
        ),
      },
    ],
    []
  );

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadAvatar(files[0]);
    }
  };

  return (
    <CustomModal open={show} onCancel={closeModal}>
      <Box padding="20px" maxWidth="910px">
        <Box display="flex" alignItems="center">
          <AvatarContainer loading={isUploadAvatarLoading}>
            <ImageComponent
              fallBack="/assets/ava.png"
              src={user?.avatarUrl ?? ""}
              alt="ava image"
            />
            <input
              onChange={handleUploadAvatar}
              type="file"
              style={{ display: "none" }}
              id="avaUploader"
              accept="image/png, image/gif, image/jpeg"
            />
            <label
              className="ava-uploader"
              style={{ cursor: "pointer" }}
              htmlFor="avaUploader"
            >
              <UploadAvatarWrapper>
                {isUploadAvatarLoading ? (
                  <PlaceholderLoading />
                ) : (
                  <UploadIcon fill="white" />
                )}
              </UploadAvatarWrapper>
            </label>
          </AvatarContainer>
          <Box padding=" 0 0 0 15px">
            <Text
              fontSize="xl"
              fontWeight="medium"
              lineHeight="xl"
              color="text"
            >
              {user?.fullName}
            </Text>
            <Text fontSize="sm" fontWeight="regular" lineHeight="large">
              Manage your personal information, passwords and more
            </Text>
          </Box>
        </Box>
        <Box as={Row} width="100%" padding="40px 0 20px">
          {isLoading ? (
            <Center width="100%">
              <Loading />
            </Center>
          ) : (
            <StyledTabs items={items as any} />
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default UpdateProfileModal;
