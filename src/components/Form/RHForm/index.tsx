import React from "react";
import {
  Control,
  DeepPartial,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormWrapper, FormWrapperProps } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";

type ChildrenOfRHForm<T> = ({
  control,
}: {
  control: Control<T & FieldValues>;
}) => JSX.Element | JSX.Element[] | undefined;

interface Props<T> extends FormWrapperProps {
  defaultValues?: DeepPartial<T>;
  schema: yup.ObjectSchema<T & ObjectShape>;
  children: ChildrenOfRHForm<T>;
  onSubmit: SubmitHandler<any>;
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
    <FormWrapper {...restProps} onSubmit={handleSubmit(onSubmit)}>
      {children({ control })}
    </FormWrapper>
  );
};

export default RHForm;
