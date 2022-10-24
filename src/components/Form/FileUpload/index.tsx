import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import FileUpload, { FileUploadProps } from "src/components/commons/FileUpload";

type Props<T extends FieldValues> = FileUploadProps & UseControllerProps<T>;

const RHFFileUpload = <T extends FieldValues>(props: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(props);

  return (
    <FileUpload error={error} onChange={onChange} value={value} {...props} />
  );
};

export default RHFFileUpload;
