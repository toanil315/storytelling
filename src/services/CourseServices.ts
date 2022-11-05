import {
  CategoryType,
  CourseBase,
  CourseType,
  LectureBase,
  LectureType,
  SectionBase,
  SectionType,
} from "src/data-model/CourseTypes";
import { axiosClient } from "src/utils/axios";

export const courseService = {
  getCourses: (): Promise<CourseType[]> => axiosClient.get("/courses"),

  getCategories: (): Promise<CategoryType[]> =>
    axiosClient.get("/category-topics"),

  getSections: (courseId: string): Promise<SectionType[]> =>
    axiosClient.get(`/courses/${courseId}/sections`),

  getLecturesOfSection: (sectionId: string): Promise<LectureType[]> =>
    axiosClient.get(`sections/${sectionId}/videos`),

  createCourse: (courseData: Partial<CourseType>): Promise<CourseType> => {
    return axiosClient.post("/courses?page=2&limit=12", courseData);
  },

  updateCourse: ({
    courseData,
    courseId,
  }: {
    courseData: Partial<CourseType>;
    courseId: string;
  }): Promise<CourseType> => {
    return axiosClient.put(`/courses/${courseId}`, courseData);
  },

  createSection: (sectionData: SectionBase): Promise<SectionType> => {
    return axiosClient.post("/sections", sectionData);
  },

  createLecture: (lectureData: LectureBase): Promise<LectureType> => {
    return axiosClient.post("/videos", lectureData);
  },

  updateLecture: (lectureData: LectureType): Promise<LectureType> => {
    const { id, ...restLectureData } = lectureData;
    return axiosClient.put(`/videos/${id}`, restLectureData);
  },
};
