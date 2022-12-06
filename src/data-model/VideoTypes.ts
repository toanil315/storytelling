export interface Video {
  link: string;
  thumbnail: string;
  name: string;
}

export interface VideoPlayList {
  videos: Video[];
}

export interface UpdateViewType {
  lastDuration: number;
  lastestViewDate: string;
  userId: string;
  videoId: string;
}
