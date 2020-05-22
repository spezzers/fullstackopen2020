import React from 'react'

const Form = props => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.nameInput} />
        </div>
        <div>
          number:{' '}
          <input value={props.numberValue} onChange={props.numberInput} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}
export default Form
