import React from "react";
import { CoursePart } from "../index";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value, null, 2)}`
    );
  };
  switch (part.name) {
    case "Fundamentals":
      return (
        <>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group Projects: {part.groupProjectCount}</p>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p><a href={part.exerciseSubmissionLink}>Submission Link</a></p>
        </>
      );
    case "My Part":
      return (
        <>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Status: {part.status}</p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
