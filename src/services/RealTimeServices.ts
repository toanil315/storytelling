import { ENV_VARIABLES, QUERY_KEYS } from "src/utils/constants";
import * as Sentry from "@sentry/nextjs";
import Stomp from "stompjs";
import { QueryClient } from "react-query";
import { NotificationType } from "src/data-model/NotificationTypes";

const initRabbitConnection = async (userId: string) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/endpoint/${userId}`
  );
  const { data } = await result.json();
  return data;
};

const handleNewNotification = (
  newNotification: NotificationType,
  currentUserId: string,
  queryClient: QueryClient
) => {
  console.log("content: ", newNotification);
  if (newNotification.senderId !== currentUserId) {
    queryClient.setQueryData(
      [QUERY_KEYS.GET_NOTIFICATION_BY_USER_ID, currentUserId],
      (old: any) => {
        return {
          ...old,
          data: [newNotification, ...old.data],
        };
      }
    );
  }
};

export default class RealTimeServices {
  constructor(userId: string, queryClient: QueryClient) {
    try {
      const ws = new WebSocket(ENV_VARIABLES.WS_URL);
      const stompClient = Stomp.over(ws);
      stompClient.debug = function () {};
      stompClient.connect(
        ENV_VARIABLES.WS_LOGIN,
        ENV_VARIABLES.WS_PASS_CODE,
        async (frame) => {
          const data = await initRabbitConnection(userId);
          stompClient.subscribe(
            `/queue/${data}`,
            (newContent) => {
              const newNotification: NotificationType = JSON.parse(
                newContent.body
              );
              handleNewNotification(newNotification, userId, queryClient);
            },
            {
              id: ENV_VARIABLES.WS_MY_SUB_ID + "-" + (data || ""),
              durable: "false",
              exclusive: "false",
              ack: "client",
              "auto-delete": "false",
            }
          );
        },
        () => {
          console.log("error");
        },
        "/"
      );
    } catch (error: any) {
      Sentry.captureException({ ...error });
      console.log({ ...error });
    }
  }
}
