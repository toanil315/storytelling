import Input from "./Input";
import RHForm from "./RHForm";
import { Title, ChangeForm } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  Title: typeof Title;
  ChangeForm: typeof ChangeForm;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.Title = Title;
Form.ChangeForm = ChangeForm;

export default Form;
