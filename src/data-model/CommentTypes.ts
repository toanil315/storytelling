export interface CommentBase {
  userId: string;
  content: string;
  videoId: string;
}

export interface CommentType extends CommentBase {
  createdAt: number;
  id: string;
}
