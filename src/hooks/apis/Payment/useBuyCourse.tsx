import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { PaymentBase } from "src/data-model/PaymentTypes";
import { paymentServices } from "src/services/PaymentServices";

const useBuyCourse = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    paymentServices.buyCourses,
    {
      onSuccess: ({ data }) => {
        window.location.href = data.paymentUrl;
      },
    }
  );

  return {
    buyCourse: (paymentData: PaymentBase) => {
      return mutate(paymentData);
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useBuyCourse;
