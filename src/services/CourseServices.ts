import {
  CategoryType,
  CourseBase,
  CourseType,
  HashTagType,
  LectureBase,
  LectureType,
  SectionBase,
  SectionType,
} from "src/data-model/CourseTypes";
import { axiosClient } from "src/utils/axios";
import {
  CustomAxiosResponse,
  CustomAxiosResponseWithPagination,
} from "src/utils/types/CustomAxiosResponse";

export const courseService = {
  getCourses: (): Promise<CustomAxiosResponseWithPagination<CourseType[]>> =>
    axiosClient.get("/courses"),

  getCourseById: (courseId: string): Promise<CustomAxiosResponse<CourseType>> =>
    axiosClient.get(`/courses/${courseId}`),

  getCourseByInstructor: (
    instructorId: string
  ): Promise<CustomAxiosResponse<CourseType[]>> =>
    axiosClient.get(`/users/courses/${instructorId}`),

  getCategories: (): Promise<CustomAxiosResponse<CategoryType[]>> =>
    axiosClient.get("/category-topics"),

  getSections: (
    courseId: string
  ): Promise<CustomAxiosResponse<{ sections: SectionType[] }>> =>
    axiosClient.get(`/courses/${courseId}/sections`),

  getSectionById: (
    sectionId: string
  ): Promise<CustomAxiosResponse<SectionType>> =>
    axiosClient.get(`/sections/${sectionId}`),

  getLecturesOfSection: (
    sectionId: string
  ): Promise<CustomAxiosResponse<LectureType[]>> =>
    axiosClient.get(`/sections/${sectionId}/videos`),

  getLectureById: (
    lectureId: string
  ): Promise<CustomAxiosResponse<LectureType>> =>
    axiosClient.get(`/videos/${lectureId}`),

  createCourse: (
    courseData: Partial<CourseType>
  ): Promise<CustomAxiosResponse<CourseType>> => {
    return axiosClient.post("/courses", courseData);
  },

  updateCourse: ({
    courseData,
    courseId,
  }: {
    courseData: Partial<CourseType>;
    courseId: string;
  }): Promise<CustomAxiosResponse<CourseType>> => {
    return axiosClient.put(`/courses/${courseId}`, courseData);
  },

  createSection: (
    sectionData: SectionBase
  ): Promise<CustomAxiosResponse<SectionType>> => {
    return axiosClient.post("/sections", sectionData);
  },

  createLecture: (
    lectureData: LectureBase
  ): Promise<CustomAxiosResponse<LectureType>> => {
    return axiosClient.post("/videos", lectureData);
  },

  updateLecture: (
    lectureData: LectureType
  ): Promise<CustomAxiosResponse<LectureType>> => {
    const { id, ...restLectureData } = lectureData;
    return axiosClient.put(`/videos/${id}`, restLectureData);
  },

  getHashTags: (): Promise<CustomAxiosResponse<HashTagType[]>> => {
    return axiosClient.get("/hashtags");
  },
};
