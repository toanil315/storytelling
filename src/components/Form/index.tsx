import Input from "./Input";
import FileUpload from "./FileUpload";
import Select from "./Select";
import Switch from "./Switch";
import RHForm from "./RHForm";
import DatePicker from "./DatePicker";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  FileUpload: typeof FileUpload;
  Select: typeof Select;
  Title: typeof Title;
  Switch: typeof Switch;
  DatePicker: typeof DatePicker;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.Title = Title;
Form.FileUpload = FileUpload;
Form.Select = Select;
Form.Switch = Switch;
Form.DatePicker = DatePicker;

export default Form;
