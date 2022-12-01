export interface LikeBase {
  userId: string;
  videoId: string;
}

export interface LikeType extends LikeBase {
  id: string;
  like: boolean;
}
