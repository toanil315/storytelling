import { useMutation, useQueryClient } from "react-query";
import { courseService } from "src/services/CourseServices";
import { LectureBase, LectureType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "src/utils/constants";

const useUpdateLecture = (): {
  updateLecture: (lectureData: LectureType) => void;
  data?: LectureType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    courseService.updateLecture,
    {
      onSuccess: () => {
        toast.success(t("toast.success.updateLecture"));
      },
      onMutate: async (updatedLecture: LectureType) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [
            QUERY_KEYS.GET_LECTURES_IN_SECTION,
            updatedLecture.sectionId,
          ],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.GET_LECTURES_IN_SECTION,
          updatedLecture.sectionId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.GET_LECTURES_IN_SECTION, updatedLecture.sectionId],
          (old: any) => {
            const newLectures = [...old.data];
            const updatedIndex = newLectures.findIndex(
              (item) => item.id === updatedLecture.id
            );
            newLectures[updatedIndex] = updatedLecture;
            return { ...old, data: [...newLectures] };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      onError: (err, updatedLecture, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_LECTURES_IN_SECTION, updatedLecture.sectionId],
          context?.previousSections
        );
        toast.error(t("toast.error.updateLecture"));
      },
      onSettled: (updatedLecture) => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.GET_LECTURES_IN_SECTION,
            updatedLecture?.data.sectionId,
          ],
        });
      },
    }
  );

  return {
    updateLecture: (lectureData: LectureType) => {
      return mutate(lectureData);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUpdateLecture;
