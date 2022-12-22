import { useState } from "react";
import { courseService } from "src/services/CourseServices";

const useAccessCourseByLectureId = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getCourseByLectureId = async (lectureId: string) => {
    setIsLoading(true);
    const { data: lectureData } = await courseService.getLectureById(lectureId);
    console.log("lectureID: ", lectureId, lectureData);
    const { data: sectionData } = await courseService.getSectionById(
      lectureData.sectionId
    );
    setIsLoading(false);
    return { courseId: sectionData.courseId, lectureId };
  };

  return {
    getCourseByLectureId,
    isLoading,
  };
};

export default useAccessCourseByLectureId;
