import { useMutation, useQueryClient } from "react-query";
import { courseService } from "src/services/CourseServices";
import { LectureBase, LectureType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "src/utils/constants";

const useCreateLecture = (): {
  createLecture: (lectureData: LectureBase) => void;
  data?: LectureType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    courseService.createLecture,
    {
      onSuccess: () => {
        toast.success(t("toast.success.createLecture"));
      },
      onMutate: async (newLecture: LectureBase) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_LECTURES_IN_SECTION, newLecture.sectionId],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.GET_LECTURES_IN_SECTION,
          newLecture.sectionId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.GET_LECTURES_IN_SECTION, newLecture.sectionId],
          (old: any) => {
            return {
              ...old,
              data: [...old.data, { ...newLecture, id: String(Date.now()) }],
            };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      onError: (err, newLecture, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_LECTURES_IN_SECTION, newLecture.sectionId],
          context?.previousSections
        );
        toast.error(t("toast.error.createLecture"));
      },
      // Always refetch after error or success:
      onSettled: (newLecture) => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.GET_LECTURES_IN_SECTION,
            newLecture?.data.sectionId,
          ],
        });
      },
    }
  );

  return {
    createLecture: (lectureData: LectureBase) => {
      return mutate(lectureData);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateLecture;
