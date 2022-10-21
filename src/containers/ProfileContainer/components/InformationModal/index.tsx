import { Col, Row } from "antd";
import React, { useMemo } from "react";
import { Control, SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import ImageComponent from "src/components/commons/Image";
import Text from "src/components/commons/Typography";
import Form from "src/components/Form";
import CustomModal from "src/components/Modal";
import { UseModalHelper } from "src/hooks/useModal";
import { userInformationSchema } from "src/utils/schemas/UserInformationSchema";
import { AvatarContainer } from "./styles";

interface InformationInputsProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

interface Props {
  modal: UseModalHelper;
}

const InformationModal = ({
  modal: { show, toggleModal, closeModal },
}: Props) => {
  const onSubmit: SubmitHandler<InformationInputsProps> = (data) =>
    console.log(data);

  const fields = useMemo(
    () => [
      {
        key: "Name",
        component: (
          <Form.Input
            placeholder="Enter your name here"
            name="name"
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
        key: "Password",
        component: (
          <Form.Input
            placeholder="Enter your password here"
            name="password"
            label="Password"
            type="password"
          />
        ),
      },
      {
        key: "Phone Number",
        component: (
          <Form.Input
            placeholder="Enter your phone number here"
            name="phoneNumber"
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
    ],
    []
  );

  const renderFields = (control: Control<InformationInputsProps>) => {
    return fields.map((colItem) => (
      <Col key={colItem.key} span={12}>
        <Box height="60px">
          {React.cloneElement(colItem.component, {
            control,
          })}
        </Box>
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
              name: "string",
              email: "string",
              password: "string",
              phoneNumber: "string",
              address: "string",
            }}
            onSubmit={onSubmit}
            schema={userInformationSchema}
          >
            {({ control }) => (
              <>
                <Box as={Row} width="100%" gutter={[20, 30]}>
                  {renderFields(control)}
                  <Col span={12}>
                    <Box as={Button} width="100%" height="55px" type="submit">
                      Edit
                    </Box>
                  </Col>
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
