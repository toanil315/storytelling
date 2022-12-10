import { PaymentBase, PaymentResponse } from "src/data-model/PaymentTypes";
import { axiosClient } from "src/utils/axios";
import { BASE_JAVA_URL } from "src/utils/constants";
import { CustomAxiosResponse } from "src/utils/types/CustomAxiosResponse";

export const paymentServices = {
  buyCourses: (
    paymentData: PaymentBase
  ): Promise<CustomAxiosResponse<PaymentResponse>> => {
    return axiosClient.post(`${BASE_JAVA_URL}/payments`, paymentData);
  },
};
