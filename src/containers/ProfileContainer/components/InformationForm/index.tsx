import { Col, Row } from "antd";
import React, { useMemo } from "react";
import { Control, SubmitHandler } from "react-hook-form";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import Form from "src/components/Form";
import { UserDetail } from "src/data-model/UserTypes";
import { useGetUserDetail, useUpdateProfileUser } from "src/hooks/apis";
import { userInformationSchema } from "src/utils/schemas/UserInformationSchema";

interface InformationInputsProps {
  email?: string;
  phone: string;
  address: string;
  occupation: string;
  fullName: string;
  dateOfBirth: string;
  backSideOfIdentityCard?: string;
  frontSideOfIdentityCard?: string;
}

const InformationForm = () => {
  const { user } = useGetUserDetail();
  const { updateProfile, isLoading } = useUpdateProfileUser();
  const onSubmit: SubmitHandler<InformationInputsProps> = (data) => {
    const identityImageUrl = `${data.frontSideOfIdentityCard} - ${data.backSideOfIdentityCard}`;
    delete data.email;
    delete data.frontSideOfIdentityCard;
    delete data.backSideOfIdentityCard;

    const validValues = {
      ...data,
      identityImageUrl,
    };

    updateProfile(validValues as UserDetail);
  };

  const fields = useMemo(
    () => [
      {
        key: "Name",
        component: (
          <Form.Input
            placeholder="Enter your name here"
            name="fullName"
            label="Name"
            isRequired
          />
        ),
      },
      {
        key: "Email",
        component: (
          <Form.Input
            disabled
            placeholder="Enter your email here"
            name="email"
            label="Email"
            isRequired
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
            isRequired
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
            isRequired
          />
        ),
      },
      {
        key: "Occupation",
        component: (
          <Form.Input
            placeholder="Enter your occupation here"
            name="occupation"
            label="Occupation"
            isRequired
          />
        ),
      },
      {
        key: "Date of birth",
        component: (
          <Form.DatePicker
            format={"YYYY-MM-DD"}
            placeholder="Enter your date of birth here"
            name="dateOfBirth"
            label="Date of birth"
            isRequired
          />
        ),
      },
      {
        key: "Front side of identity card",
        component: (
          <Form.FileUpload
            placeholder="Enter your front side of identity card here"
            name="frontSideOfIdentityCard"
            label="Front side of identity card"
            isRequired
          />
        ),
      },
      {
        key: "Back side of identity card",
        component: (
          <Form.FileUpload
            placeholder="Enter your back side of identity card here"
            name="backSideOfIdentityCard"
            label="Back side of identity card"
            isRequired
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
    <Form
      width="100%"
      defaultValues={{
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        address: user?.address ?? "",
        occupation: user?.occupation ?? "",
        fullName: user?.fullName ?? "",
        dateOfBirth: user?.dateOfBirth ?? "",
        backSideOfIdentityCard: user?.identityImageUrl?.split(" - ")[1] ?? "",
        frontSideOfIdentityCard: user?.identityImageUrl?.split(" - ")[0] ?? "",
      }}
      onSubmit={onSubmit}
      schema={userInformationSchema}
      enableResetForm={true}
    >
      {({ control }) => (
        <>
          <Box as={Row} width="100%" gutter={[20, 30]}>
            {renderFields(control as any)}
            <Box
              loading={isLoading}
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
  );
};

export default InformationForm;
