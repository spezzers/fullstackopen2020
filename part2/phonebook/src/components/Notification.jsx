import React from 'react'


const Notification = ({type, content}) => {
    if( content === null) {
        return null
    }
    return(
        <div className={type}>
            {content}
        </div>
    )
}

export default Notification