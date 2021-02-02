import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const exerciseTotal: number = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  )

  return (
    <div>
      <Header title={courseName}/>
      <Content courseParts={courseParts} />
      <Total amount={exerciseTotal}/>      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));