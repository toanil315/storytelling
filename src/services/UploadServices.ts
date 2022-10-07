import axiosClient from "src/utils/axiosClient";

export default async function Upload(formData: FormData, config: any) {
  return axiosClient
    .post("https://httpbin.org/post", formData, config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
