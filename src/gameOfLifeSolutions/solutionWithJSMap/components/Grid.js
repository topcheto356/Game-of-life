import React from 'react';

const Grid = (props) => {
	//select generation 0
	const onClickHandler = (event, cords) => {
		if (event.target.className === 'squere-dead') {
			event.target.className = 'squere-alive';
		} else {
			event.target.className = 'squere-dead';
		}

		props.selectGeneraion0(cords);
	};

	return <div className='grid'>{}</div>;
};

export default Grid;
