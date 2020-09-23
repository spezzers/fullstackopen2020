import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const Filter = () => {
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const changeFilter = event => {
		event.preventDefault()
		dispatch(setFilter(event.target.value))
	}
	const clearForm = event => {
		event.preventDefault()
		dispatch(clearFilter())
	}
	const buttonVisible = {
		display: filter.length > 0 ? null : 'none'
	}
	return (
		<div style={{ margin: '10px 0 14px' }}>
			<input
				name='filter'
				onChange={changeFilter}
				value={filter}
				placeholder='filter'
			/>
			<button onClick={clearForm} style={buttonVisible}>
				Clear Filter
			</button>
		</div>
	)
}

export default Filter
