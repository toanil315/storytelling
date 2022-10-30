import { useMutation } from "react-query";
import { courseService } from "src/services/CourseServices";
import { CourseBase, CourseType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useCreateCourse = (): {
  createCourse: (courseData: CourseBase) => void;
  data?: CourseType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    courseService.createCourse,
    {
      onError: () => {
        toast.error(t("toast.error.createCourse"));
      },
      onSuccess: () => {
        toast.success(t("toast.success.createCourse"));
      },
    }
  );

  return {
    createCourse: (courseData: CourseBase) => {
      return mutate(courseData);
    },
    data: data?.data.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateCourse;
