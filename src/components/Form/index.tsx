import Input from "./Input";
import FileUpload from "./FileUpload";
import Select from "./Select";
import RHForm from "./RHForm";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  FileUpload: typeof FileUpload;
  Select: typeof Select;
  Title: typeof Title;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.Title = Title;
Form.FileUpload = FileUpload;
Form.Select = Select;

export default Form;
