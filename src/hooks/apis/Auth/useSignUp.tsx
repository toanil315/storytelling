import { UserRegister } from "src/data-model/UserTypes";
import { useMutation } from "react-query";
import { authService } from "src/services/AuthServices";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";

const useSignUp = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.register,
    {
      onSuccess: () => {
        // Invalidate and refetch
        router.push(Path.login);
      },
    }
  );

  return {
    register: async (registerData: UserRegister) => {
      const result = await mutate(registerData);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useSignUp;
