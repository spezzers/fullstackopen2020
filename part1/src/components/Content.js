import React from 'react';
import Part from './Part'

const Content = (props) => {
    const partArray = props.parts.map(part => <Part part={part}/>)
    return (
        partArray
    )
}

export default Content