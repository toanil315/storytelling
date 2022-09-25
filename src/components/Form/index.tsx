import Input from "./Input";
import RHForm from "./RHForm";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  Title: typeof Title;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.Title = Title;

export default Form;
