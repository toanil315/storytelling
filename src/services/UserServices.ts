import { NotificationType } from "src/data-model/NotificationTypes";
import {
  PaymentHistory,
  RevenueForTheMonthType,
} from "src/data-model/PaymentTypes";
import {
  ChangePasswordType,
  UserDetail,
  UserType,
} from "src/data-model/UserTypes";
import { axiosClient } from "src/utils/axios";
import { BASE_JAVA_URL, DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
import {
  CustomAxiosResponse,
  CustomAxiosResponseWithPagination,
} from "src/utils/types/CustomAxiosResponse";

export const userServices = {
  getAllNotifications: (
    userId: string,
    page?: number
  ): Promise<CustomAxiosResponseWithPagination<NotificationType[]>> => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/notifications/${userId}?page=${page ?? 1}&paging=${
        DEFAULT_PAGINATION_SIZE.NOTIFICATIONS_SIZE
      }&sort=createdAt&order=desc`
    );
  },
  markAllReadNotification: (userId: string) => {
    return axiosClient.patch(
      `${BASE_JAVA_URL}/notifications/markAllRead/${userId}`
    );
  },

  markReadNotification: (notificationId: string) => {
    return axiosClient.patch(
      `${BASE_JAVA_URL}/notifications/${notificationId}`
    );
  },

  getUserById: (userId: string): Promise<CustomAxiosResponse<UserType>> => {
    return axiosClient.get(`/users/${userId}`);
  },

  updateProfileUser: (userData: UserDetail): Promise<any> => {
    return axiosClient.put("/users/update-profile", userData);
  },

  changePassword: (changePassword: ChangePasswordType): Promise<any> => {
    return axiosClient.post("/change-password", changePassword);
  },

  uploadAvatar: (avatarUrl: string): Promise<any> => {
    return axiosClient.put("/users/update-avatar", { avatarUrl });
  },

  checkPurchasedCourse: (
    userId: string,
    courseId: string
  ): Promise<CustomAxiosResponse<any>> => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/subscribes/courses/${courseId}/users/${userId}/checkSubscribe`
    );
  },

  getPurchasedHistoryOfInstructor: (
    instructorId: string,
    page?: number,
    pageSize?: number
  ): Promise<CustomAxiosResponseWithPagination<PaymentHistory[]>> => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/instructors/${instructorId}/payments?page=${
        page ?? 1
      }&limit=${pageSize ?? 5}`
    );
  },

  getPurchasesOfUser: (
    userId: string
  ): Promise<CustomAxiosResponseWithPagination<PaymentHistory[]>> => {
    return axiosClient.get(`${BASE_JAVA_URL}/users/${userId}/payments`);
  },

  getEarningDataOfInstructor: (
    instructorId: string
  ): Promise<CustomAxiosResponse<RevenueForTheMonthType[]>> => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/instructors/${instructorId}/revenue`
    );
  },
};
