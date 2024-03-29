export { default as useSignUp } from "./Auth/useSignUp";
export { default as useSignIn } from "./Auth/useSignIn";
export { default as useUser } from "./Auth/useUser";
export { default as useGetUserDetail } from "./Auth/useGetUserDetail";
export * from "./Auth/useForgotPassword";

export { default as useCreateCourse } from "./Course/useCreateCourse";
export { default as useCreateSection } from "./Course/useCreateSection";
export { default as useGetCategory } from "./Course/useGetCategory";
export * from "./Course/useGetCourseById";
export { default as useGetCourses } from "./Course/useGetCourses";
export { default as useGetSection } from "./Course/useGetSection";
export { default as useUpdateCourse } from "./Course/useUpdateCourse";
export { default as useCreateLecture } from "./Course/useCreateLecture";
export { default as useUpdateLecture } from "./Course/useUpdateLecture";
export { default as useGetCoursesByInstructor } from "./Course/useGetCoursesByInstructor";
export { default as useGetLectureById } from "./Course/useGetLectureById";
export { default as useGetCommentsOfVideo } from "./Course/useGetCommentsOfVideo";
export { default as useAccessCourseByLectureId } from "./Course/useAccessCourseByLectureId";
export * from "./Course/useGetLecturesBySection";
export { default as useGetHashTags } from "./Course/useGetHashTags";
export { default as useSearchCourses } from "./Course/useSearchCourses";
export { default as useCountLikeOfVideo } from "./Course/useCountLikeOfVideo";
export { default as useCheckLikeVideo } from "./Course/useCheckLikeVideo";
export { default as useLikeVideo } from "./Course/useLikeVideo";
export { default as useGetMyPurchasedCourses } from "./Course/useGetMyPurchasedCourses";
export { default as useGetAttendanceByMonth } from "./Course/useGetAttendanceByMonth";
export { default as useCheckFinishedCourse } from "./Course/useCheckFinishedCourse";
export { default as usePublishCourse } from "./Course/usePublishCourse";

export { default as useGetNotifications } from "./User/useGetNotifications";
export { default as useMarkAllReadNotifications } from "./User/useMarkAllReadNotifications";
export { default as useMarkReadNotification } from "./User/useMarkReadNotification";
export { default as useUpdateProfileUser } from "./User/useUpdateProfileUser";
export { default as useChangePassword } from "./User/useChangePassword";
export { default as useUploadAvatar } from "./User/useUploadAvatar";
export { default as useGetRevenueOfTheMonths } from "./User/useGetRevenueOfTheMonths";
export { default as useFollowInstructor } from "./User/useFollowInstructor";
export { default as useGetListFollowByUser } from "./User/useGetListFollowByUser";
export { default as useRequestToBecomeAnInstructor } from "./User/useRequestToBecomeAnInstructor";
export { default as useCheckFollow } from "./User/useCheckFollow";

export { default as useRealTimeServices } from "./RealTime/useRealTimeServices";

export * from "./User/useGetUserById";

export { default as useBuyCourse } from "./Payment/useBuyCourse";
export { default as useGetPurchasedHistory } from "./Payment/useGetPurchasedHistory";
