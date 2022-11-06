import { useMutation, useQueryClient } from "react-query";
import { courseService } from "src/services/CourseServices";
import { SectionBase, SectionType } from "src/data-model/CourseTypes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "src/utils/constants";

const useCreateSection = (): {
  createSection: (sectionData: SectionBase) => void;
  data?: SectionType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    courseService.createSection,
    {
      onSuccess: () => {
        toast.success(t("toast.success.createSection"));
      },
      onMutate: async (newSection: SectionBase) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_SECTIONS, newSection.courseId],
        });

        // Snapshot the previous value
        const previousSections = queryClient.getQueryData([
          QUERY_KEYS.GET_SECTIONS,
          newSection.courseId,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          [QUERY_KEYS.GET_SECTIONS, newSection.courseId],
          (old: any) => {
            console.log(old);
            return {
              ...old,
              data: {
                sections: [
                  ...old.data.sections,
                  { ...newSection, id: String(Date.now()) },
                ],
              },
            };
          }
        );

        // Return a context object with the snapshotted value
        return { previousSections };
      },
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      onError: (err, newSection, context) => {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_SECTIONS, newSection.courseId],
          context?.previousSections
        );
        toast.error(t("toast.error.createSection"));
      },
      // Always refetch after error or success:
      onSettled: (newSection) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_SECTIONS, newSection?.data.courseId],
        });
      },
    }
  );

  return {
    createSection: (sectionData: SectionBase) => {
      return mutate(sectionData);
    },
    data: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateSection;
