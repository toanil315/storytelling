export interface CourseBase {
  name: string;
  price: string;
  description: string;
  thumbnailUrl: string;
  userId: string;
  categoryTopicId: string;
  hashTag?: string[];
}

export interface SectionBase {
  name: string;
  courseId: string;
}

export interface CategoryBase {
  name: string;
}

export interface LectureType {
  id: string;
  title: string;
  video: string;
  thumbnail: string;
}

export interface CourseType extends CourseBase {
  id: string;
  isActived: boolean;
}

export interface SectionType extends SectionBase {
  id: string;
  lectures: LectureType[];
}

export interface CategoryType extends CategoryBase {
  id: string;
}
