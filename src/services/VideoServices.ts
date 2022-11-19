import { CommentBase, CommentType } from "src/data-model/CommentTypes";
import { axiosClient } from "src/utils/axios";
import { CustomAxiosResponseWithPagination } from "src/utils/types/CustomAxiosResponse";

export const videoServices = {
  getComments: (
    videoId: string
  ): Promise<CustomAxiosResponseWithPagination<CommentType[]>> => {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/comments/${videoId}?sort=createdAt&order=asc`
    );
  },

  postComment: (commentData: CommentBase) => {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/comments`,
      commentData
    );
  },
};
