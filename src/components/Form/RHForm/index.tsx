import React from "react";
import {
  Control,
  DeepPartial,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormWrapper } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";
import Box, { BoxProps } from "src/components/commons/Box";
import { Form } from "antd";

type ChildrenOfRHForm<T> = ({
  control,
}: {
  control: Control<T & FieldValues>;
}) => JSX.Element | JSX.Element[] | undefined;

interface Props<T> extends BoxProps {
  defaultValues?: DeepPartial<T>;
  schema: yup.ObjectSchema<ObjectShape>;
  children: ChildrenOfRHForm<T>;
  onSubmit: SubmitHandler<T & FieldValues>;
}

const RHForm = <T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  children,
  ...restProps
}: Props<T>) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Box as={FormWrapper} {...restProps} onSubmit={handleSubmit(onSubmit)}>
      {children({ control })}
    </Box>
  );
};

export default RHForm;
