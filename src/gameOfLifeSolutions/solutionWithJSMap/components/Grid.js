import React, { useState } from 'react';

const Grid = (props) => {
	const generation = props.generation;
	const rows = props.rows;
	const columns = props.columns;

	//select generation 0
	const onClickHandler = (event, cords) => {
		if (event.target.className === 'squere-dead') {
			event.target.className = 'squere-alive';
		} else {
			event.target.className = 'squere-dead';
		}

		props.selectGeneraion0(cords);
	};

	return (
		<div className='grid'>
			{rows.map((fel, i) => {
				return (
					<div className='row' key={`row-${i}`}>
						{columns.map((sel, j) => {
							let className = '';

							if (generation.has(`${i},${j}`)) {
								className = 'squere-alive';
							} else {
								className = 'squere-dead';
							}

							return (
								<div
									className={className}
									key={`row-${i} column-${j}`}
									onClick={(event) => onClickHandler(event, `${i},${j}`)}
								></div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Grid;
