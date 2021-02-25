import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
// ------------------------------------------------------------

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescribe extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescribe {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescribe {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescribe {
  name: "My Part";
  status: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// --------------------------------------------------------------

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "My Part",
      description: "added for 9.15",
      exerciseCount: 1,
      status: "active"
    }
  ];
  const exerciseTotal: number = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total amount={exerciseTotal} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
