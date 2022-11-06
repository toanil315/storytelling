import { useMutation, useQueryClient } from "react-query";
import { courseService } from "src/services/CourseServices";
import { CourseType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "src/utils/constants";

const useUpdateCourse = (): {
  updateCourse: (courseData: Partial<CourseType>, courseId: string) => void;
  data?: CourseType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const client = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    courseService.updateCourse,
    {
      onError: () => {
        toast.error(t("toast.error.updateCourse"));
      },
      onSuccess: (data) => {
        toast.success(t("toast.success.updateCourse"));
        client.refetchQueries([QUERY_KEYS.GET_COURSE_DETAIL, data.data.id]);
      },
    }
  );

  return {
    updateCourse: (courseData, courseId) => {
      return mutate({ courseData, courseId });
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUpdateCourse;
