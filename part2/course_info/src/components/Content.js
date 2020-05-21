import React from 'react';
import Part from './Part'

const Content = props => props.parts.map(part => <Part part={part}/>)

export default Content