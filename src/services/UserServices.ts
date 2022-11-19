import { NotificationType } from "src/data-model/NotificationTypes";
import { axiosClient } from "src/utils/axios";
import { CustomAxiosResponseWithPagination } from "src/utils/types/CustomAxiosResponse";

export const userServices = {
  getAllNotifications: (
    userId: string
  ): Promise<CustomAxiosResponseWithPagination<NotificationType[]>> => {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/${userId}?sort=createdAt&order=asc`
    );
  },
  markAllReadNotification: (userId: string) => {
    return axiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/markAllRead/${userId}`
    );
  },
};
