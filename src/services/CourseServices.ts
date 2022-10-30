import { CourseBase, SectionBase } from "src/data-model/CourseTypes";
import { axiosClient } from "src/utils/axios";

export const courseService = {
  getCourses: () => axiosClient.get("/courses"),

  getCategories: () => axiosClient.get("/category-topics"),

  createCourse: (courseData: CourseBase) => {
    return axiosClient.post("/courses", courseData);
  },

  createSection: (sectionData: SectionBase) => {
    return axiosClient.post("/sections", sectionData);
  },
};
