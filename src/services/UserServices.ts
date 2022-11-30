import { NotificationType } from "src/data-model/NotificationTypes";
import {
  ChangePasswordType,
  UserDetail,
  UserType,
} from "src/data-model/UserTypes";
import { axiosClient } from "src/utils/axios";
import { DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
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
      `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/${userId}?page=${
        page ?? 1
      }&paging=${
        DEFAULT_PAGINATION_SIZE.NOTIFICATIONS_SIZE
      }&sort=createdAt&order=desc`
    );
  },
  markAllReadNotification: (userId: string) => {
    return axiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/markAllRead/${userId}`
    );
  },

  markReadNotification: (notificationId: string) => {
    return axiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/${notificationId}`
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
};
