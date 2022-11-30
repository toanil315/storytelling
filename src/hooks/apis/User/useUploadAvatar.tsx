import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Upload from "src/services/UploadServices";
import { userServices } from "src/services/UserServices";
import { QUERY_KEYS } from "src/utils/constants";

const useUploadAvatar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const url = await Upload(formData, undefined, "image");
        userServices.uploadAvatar(url);
        queryClient.setQueryData([QUERY_KEYS.GET_ME], (old: any) => {
          return {
            ...old,
            data: {
              ...old.data,
              avatarUrl: url,
            },
          };
        });
        toast.success("Upload avatar successfully.");
      }
    } catch (error) {
      toast.error("Upload avatar failed. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAvatar,
    isLoading,
  };
};

export default useUploadAvatar;
