import { toast } from "react-toastify";
import { ERRORS, ERRORS_DETAIL } from "../constants";

const handleErrors = (statusCode: number) => {
  toast.error(ERRORS_DETAIL[ERRORS[statusCode] as keyof typeof ERRORS_DETAIL]);
};

export default handleErrors;
