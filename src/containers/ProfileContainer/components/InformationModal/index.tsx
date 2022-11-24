import { Col, Row } from "antd";
import React, { useMemo } from "react";
import { Control, SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import CustomModal from "src/components/Modal";
import { useGetUserDetail } from "src/hooks/apis";
import { UseModalHelper } from "src/hooks/useModal";
import { userInformationSchema } from "src/utils/schemas/UserInformationSchema";
import { AvatarContainer } from "./styles";

interface InformationInputsProps {
  email: string;
  phone: string;
  address: string;
  occupation: string;
  fullName: string;
  dateOfBirth: string;
  backSideOfIdentityCard: string;
  frontSideOfIdentityCard: string;
}

interface Props {
  modal: UseModalHelper;
}

const InformationModal = ({
  modal: { show, toggleModal, closeModal },
}: Props) => {
  const { user } = useGetUserDetail();
  const onSubmit: SubmitHandler<InformationInputsProps> = (data) =>
    console.log(data);

  const fields = useMemo(
    () => [
      {
        key: "Name",
        component: (
          <Form.Input
            placeholder="Enter your name here"
            name="fullName"
            label="Name"
          />
        ),
      },
      {
        key: "Email",
        component: (
          <Form.Input
            placeholder="Enter your email here"
            name="email"
            label="Email"
          />
        ),
      },
      {
        key: "Phone Number",
        component: (
          <Form.Input
            placeholder="Enter your phone number here"
            name="phone"
            label="Phone Number"
          />
        ),
      },
      {
        key: "Address",
        component: (
          <Form.Input
            placeholder="Enter your address here"
            name="address"
            label="Address"
          />
        ),
      },
      {
        key: "Address",
        component: (
          <Form.Input
            placeholder="Enter your occupation here"
            name="occupation"
            label="Occupation"
          />
        ),
      },
      {
        key: "Address",
        component: (
          <Form.Input
            placeholder="Enter your date of birth here"
            name="dateOfBirth"
            label="Date of birth"
          />
        ),
      },
      {
        key: "Address",
        component: (
          <Form.FileUpload
            placeholder="Enter your front side of identity card here"
            name="frontSideOfIdentityCard"
            label="Front side of identity card"
          />
        ),
      },
      {
        key: "Address",
        component: (
          <Form.FileUpload
            placeholder="Enter your back side of identity card here"
            name="backSideOfIdentityCard"
            label="Back side of identity card"
          />
        ),
      },
    ],
    []
  );

  const renderFields = (control: Control<InformationInputsProps>) => {
    return fields.map((colItem) => (
      <Col key={colItem.key} span={12}>
        {React.cloneElement(colItem.component, {
          control,
        })}
      </Col>
    ));
  };

  return (
    <CustomModal open={show} onCancel={closeModal}>
      <Box padding="20px" maxWidth="910px">
        <Box display="flex" alignItems="center">
          <AvatarContainer>
            <ImageComponent src="/assets/ava.png" alt="ava image" />
          </AvatarContainer>
          <Box padding=" 0 0 0 15px">
            <Text
              fontSize="xl"
              fontWeight="medium"
              lineHeight="xl"
              color="text"
            >
              Maher Zain
            </Text>
            <Text fontSize="sm" fontWeight="regular" lineHeight="large">
              Manage your personal information, passwords and more
            </Text>
          </Box>
        </Box>
        <Box as={Row} width="100%" padding="40px 0 20px">
          <Form
            width="100%"
            defaultValues={{
              email: user?.email ?? "",
              phone: user?.phone ?? "",
              address: user?.address ?? "",
              occupation: user?.occupation ?? "",
              fullName: user?.fullName ?? "",
              dateOfBirth: user?.dateOfBirth ?? "",
              backSideOfIdentityCard: "",
              frontSideOfIdentityCard: "",
            }}
            onSubmit={onSubmit}
            schema={userInformationSchema}
            enableResetForm={true}
          >
            {({ control }) => (
              <>
                <Box as={Row} width="100%" gutter={[20, 30]}>
                  {renderFields(control)}
                  <Box
                    as={Button}
                    width="50%"
                    height="50px"
                    type="submit"
                    margin="20px auto"
                  >
                    Edit
                  </Box>
                </Box>
              </>
            )}
          </Form>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default InformationModal;
