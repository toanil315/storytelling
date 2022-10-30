export interface Video {
  link: string;
  thumbnail: string;
  name: string;
}

export interface VideoPlayList {
  videos: Video[];
}
