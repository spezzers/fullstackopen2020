import React from 'react'

const 
    Header = ({course}) => <h1>{course}</h1>,
    Part = ({part}) => <p>{part.name} {part.exercises}</p>,
    Content = ({parts}) => parts.map(part => <Part key={part.id} part={part}/>),
    Total = ({parts}) => {
        const total = parts.map(p => p.exercises).reduce(
            (sum, part) => sum + part
        )
        return (
            <>
                <p><em>Total exercises {total}</em></p>
            </>
        )
    }


const Course = ({courses}) => {
    const allCourses = courses.map(c => 
        <div key={c.id}>
            <Header course={c.name}/>
            <Content parts={c.parts}/>
            <Total parts={c.parts}/>
        </div>
    )
    return (
        allCourses
    )
}

export default Course