import React from "react";
import PrimaryContainer from "../../components/primary-container/primary-container";
import CourseHeader from "../../components/course-header/course-header";

const Course: React.FC = () => {
  return (
    <PrimaryContainer direction="column">
        <CourseHeader module={1} section={1} />
    </PrimaryContainer>
  );
}

export default Course;