import React, {useState} from 'react'

const CreateNewBlog = (props) => {
    const [addBlogVisible, setAddBlogVisible] = useState(false)

    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setAddBlogVisible(true)}>Add blog</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}



export default CreateNewBlog