import {
  CourseBase,
  CourseType,
  SectionBase,
} from "src/data-model/CourseTypes";
import { axiosClient } from "src/utils/axios";

export const courseService = {
  getCourses: () => axiosClient.get("/courses"),

  getCategories: () => axiosClient.get("/category-topics"),

  createCourse: (courseData: Partial<CourseType>) => {
    return axiosClient.post("/courses", courseData);
  },

  updateCourse: ({
    courseData,
    courseId,
  }: {
    courseData: Partial<CourseType>;
    courseId: string;
  }) => {
    return axiosClient.put(`/courses/${courseId}`, courseData);
  },

  createSection: (sectionData: SectionBase) => {
    return axiosClient.post("/sections", sectionData);
  },
};
