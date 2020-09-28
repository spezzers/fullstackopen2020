import React from 'react'
import { connect } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const FilterComponent = (props) => {
	const filter = props.filter

	const changeFilter = event => {
		event.preventDefault()
		props.setFilter(event.target.value)
	}
	const clearForm = event => {
		event.preventDefault()
		props.clearFilter()
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

const mapStateToProps = state => {
	return {
		filter: state.filter
	}
}
const mapDispatchToProps = {setFilter, clearFilter}

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent)

export default Filter
