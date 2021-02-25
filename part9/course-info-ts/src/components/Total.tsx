import React from 'react';

const Total: React.FC<{amount: number}> = ({amount}) => {
	return (
		<div>
			<h2>
				Total Number of exercises:{' '}
				{amount}
			</h2>
		</div>
	);
};

export default Total;
