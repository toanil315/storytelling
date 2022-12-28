import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { courseService } from "src/services/CourseServices";
import { QUERY_KEYS } from "src/utils/constants";

const usePublishCourse = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(courseService.publishCourse, {
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_COURSE_DETAIL, courseId]);
      toast.success(t("toast.success.publishCourse"));
    },
    onError: () => {
      toast.error(t("toast.error.publishCourse"));
    },
  });

  return {
    publishCourse: (courseId: string) => {
      return mutate(courseId);
    },
    isLoading,
  };
};

export default usePublishCourse;
