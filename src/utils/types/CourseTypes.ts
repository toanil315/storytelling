export interface SectionType {
  id: string;
  title: string;
  lectures: LectureType[];
}

export interface LectureType {
  id: string;
  title: string;
  video: string;
  thumbnail: string;
}

export interface CourseType {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  hashTag: string[];
  sections: SectionType[];
}
