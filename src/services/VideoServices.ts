import { CommentBase, CommentType } from "src/data-model/CommentTypes";
import { axiosClient } from "src/utils/axios";
import {
  BASE_JAVA_URL,
  BASE_URL,
  DEFAULT_PAGINATION_SIZE,
} from "src/utils/constants";
import { CustomAxiosResponseWithPagination } from "src/utils/types/CustomAxiosResponse";

export const videoServices = {
  getComments: (
    videoId: string,
    page: number
  ): Promise<CustomAxiosResponseWithPagination<CommentType[]>> => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/videos/${videoId}/comments?page=${page}&paging=${DEFAULT_PAGINATION_SIZE.COMMENTS}&sort=createdAt&order=desc`
    );
  },

  postComment: (commentData: CommentBase) => {
    return axiosClient.post(
      `${BASE_JAVA_URL}/videos/${commentData.videoId}/comments`,
      commentData
    );
  },
};
