import i18next from "i18next";
import { toast } from "react-toastify";
import { axiosClient } from "src/utils/axios";

export default async function Upload(
  formData: FormData,
  config: any,
  type: string
) {
  try {
    const data: { url: string } = await axiosClient.post(
      `/upload/${type}`,
      formData,
      config
    );
    return data.url;
  } catch (error) {
    toast.error(i18next.t("toast.error.uploadFile") as string);
  }
}
