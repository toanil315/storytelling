export interface CourseBase {
  name: string;
  price: string;
  description: string;
  thumbnailUrl: string;
  userId: string;
  categoryTopicId: string;
  hashtags?: string[];
}

export interface SectionBase {
  name: string;
  courseId: string;
}

export interface CategoryBase {
  name: string;
}

export interface LectureBase {
  description: string;
  duration: string;
  thumbnailUrl: string;
  title: string;
  url: string;
  isLock: boolean;
  userId: string;
  sectionId: string;
}

export interface CourseType extends CourseBase {
  id: string;
  isActived: boolean;
}

export interface LectureType extends LectureBase {
  id: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
}

export interface SectionType extends SectionBase {
  id: string;
}

export interface CategoryType extends CategoryBase {
  id: string;
}

export interface HashTagType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
