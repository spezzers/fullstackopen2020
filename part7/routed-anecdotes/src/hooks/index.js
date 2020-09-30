import { useState } from 'react'

export const useField = (type, name) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        event.type === 'change'
            ? setValue(event.target.value)
            : setValue('')
    }
    const onClick = (event) => {
        event.preventDefault()
        Array.isArray(type) 
        ? type.map(field => field.onChange(''))
        : setValue('')
    }
    if(Array.isArray(type)) {
        return {onClick}
    }
  
    return {
      type,
      value,
      onChange,
      name
    }
  }