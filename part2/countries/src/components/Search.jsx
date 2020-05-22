import React from 'react'

const Search = (props) => {
    return (
        <>
            <div>
                Search: <input value={props.value} onChange={props.onChange}/>
            </div>
        </>
    )
}
export default Search
