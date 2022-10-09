import axiosClient from "src/utils/axiosClient";

export default async function Upload(formData: FormData, config: any) {
  try {
    const data = await axiosClient.post(
      "https://httpbin.org/post",
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
