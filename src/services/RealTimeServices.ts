import { ENV_VARIABLES } from "src/utils/constants";
import * as Sentry from "@sentry/nextjs";
import Stomp from "stompjs";

const initRabbitConnection = async (userId: string) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_WS_URL}/notifications/endpoint/${userId}`
  );
  const { data } = await result.json();
  return data;
};

export default class RealTimeServices {
  init = (userId: string) => {
    try {
      const ws = new WebSocket(ENV_VARIABLES.WS_URL);
      const stompClient = Stomp.over(ws);
      stompClient.debug = function () {};
      stompClient.connect(
        ENV_VARIABLES.WS_LOGIN,
        ENV_VARIABLES.WS_PASS_CODE,
        async (frame) => {
          const data = await initRabbitConnection(userId);
          console.log("ws data: ", data);
          stompClient.subscribe(
            `/queue/${data}`,
            (newContent) => {
              console.log("newContent: ", JSON.parse(newContent.body));
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
  };
}
