import { CommentBase, CommentType } from "src/data-model/CommentTypes";
import { LikeBase, LikeType } from "src/data-model/LikeTypes";
import { UpdateViewType } from "src/data-model/VideoTypes";
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

  countLikesOfVideo: (
    videoId: string
  ): Promise<CustomAxiosResponseWithPagination<LikeType[]>> => {
    return axiosClient.get(`${BASE_JAVA_URL}/videos/${videoId}/reacts`);
  },

  postComment: (commentData: CommentBase) => {
    return axiosClient.post(`${BASE_JAVA_URL}/comments`, commentData);
  },

  checkLikedVideo: (videoId: string, userId: string) => {
    return axiosClient.get(
      `${BASE_JAVA_URL}/reacts/videos/${videoId}/users/${userId}/checkLike`
    );
  },

  likeVideo: (likeData: LikeBase) => {
    return axiosClient.post(`${BASE_JAVA_URL}/reacts`, likeData);
  },

  updateViewLecture: (updateViewData: UpdateViewType) => {
    return axiosClient.put(`${BASE_URL}/users/update-view`, updateViewData);
  },
};
